// TODO：目前是靜態畫面。實際使用時要接：新增標籤的 input state + 送出邏輯、
// 刪除標籤的邏輯（刪除前可能要提示「這個標籤還有 N 筆紀錄在用」），這些留給你練習。

const TAGS = [
  { name: '早餐', count: 32 },
  { name: '聚餐', count: 18 },
  { name: '週末', count: 9 },
  { name: '出差', count: 4 },
  { name: '禮物', count: 2 },
];

export default function AccountingTagManagementPage() {
  return (
    <>
      <div className="mb-6.5 flex items-center gap-3">
        <button
          type="button"
          aria-label="返回"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ‹
        </button>
        <h1 className="text-[20px] font-bold">標籤管理</h1>
      </div>

      <div className="mb-6 rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-2 text-[13px] font-bold text-ink-soft">
          新增標籤
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="輸入標籤名稱"
            className="flex-1 rounded-[11px] px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft shadow-in outline-none"
          />
          <button
            type="button"
            className="rounded-[11px] bg-linear-to-r from-accent-money to-[#e0aa6f] px-5 text-sm font-bold text-white shadow-out"
          >
            新增
          </button>
        </div>
      </div>

      <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-4 text-[13px] font-bold text-ink-soft">
          所有標籤
        </div>
        <div className="flex flex-col gap-1 rounded-[14px] shadow-in">
          {TAGS.map((tag, index) => (
            <div key={tag.name}>
              {index > 0 && <div className="h-px bg-line" />}
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🏷️</span>
                  <div>
                    <div className="text-sm font-semibold">{tag.name}</div>
                    <div className="text-xs text-ink-soft">
                      已使用 {tag.count} 筆
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`刪除標籤 ${tag.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft shadow-in"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
