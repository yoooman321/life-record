// TODO：目前是靜態畫面，永遠渲染在畫面上。實際使用時要自己包一層開關 state（是否顯示 modal）、
// 支出/收入 tab 的 active 邏輯、類別選取、每個欄位的 controlled input、送出邏輯，這些留給你練習。

const CATEGORIES = [
  { label: '飲食', icon: '🍱' },
  { label: '交通', icon: '🚌' },
  { label: '社交', icon: '🎉' },
  { label: '學習/3C', icon: '💻' },
  { label: '居家/水電', icon: '🏠' },
  { label: '收入', icon: '💵' },
  { label: '投資', icon: '📈' },
];

export default function AddEntryModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-[440px] rounded-[20px] border border-line bg-panel p-6 shadow-sm">
        {/* 關閉：右上角 */}
        <button
          type="button"
          aria-label="關閉"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ✕
        </button>

        {/* 日期 */}
        <div className="mb-5 text-center text-sm font-semibold text-ink-soft">
          2026年9月17日・週四
        </div>

        {/* 欄位列表：類型 + 金額 */}
        <div className="flex flex-col gap-1 rounded-[14px] shadow-in">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="text-lg">💱</span>
              <span className="text-sm font-semibold">類型</span>
            </div>
            <div className="flex gap-1 rounded-full bg-bg p-1">
              <button
                type="button"
                className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-ink shadow-out"
              >
                支出
              </button>
              <button
                type="button"
                className="rounded-full px-3 py-1 text-xs font-semibold text-ink-soft"
              >
                收入
              </button>
            </div>
          </div>

          <div className="h-px bg-line" />

          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="text-lg">💰</span>
              <span className="text-sm font-semibold">金額</span>
            </div>
            <input
              type="number"
              placeholder="輸入金額"
              className="w-32 text-right text-sm text-ink placeholder:text-ink-soft outline-none"
            />
          </div>
        </div>

        {/* 類別：可左右滑動挑選、最後一個是新增類別 */}
        <div className="mt-4">
          <div className="mb-2 text-[13px] font-bold text-ink-soft">類別</div>
          <div className="grid auto-cols-min grid-flow-col grid-rows-2 gap-x-4 gap-y-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category.label}
                type="button"
                className={`flex w-16 flex-col items-center gap-1.5 rounded-[14px] py-2 ${
                  category.label === '飲食' ? 'bg-bg' : ''
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg shadow-in">
                  {category.icon}
                </span>
                <span className="text-xs font-semibold text-ink-soft">
                  {category.label}
                </span>
              </button>
            ))}

            <button
              type="button"
              className="flex w-16 flex-col items-center gap-1.5 rounded-[14px] py-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-ink-soft shadow-in">
                ＋
              </span>
              <span className="text-xs font-semibold text-ink-soft">新增</span>
            </button>
          </div>
          {/* 示意可以左右滑動看更多類別的分頁小圓點，實際頁數要看之後類別數量再接邏輯 */}
          <div className="mt-1 flex justify-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/25" />
          </div>
        </div>

        {/* 欄位列表：標籤 + 照片 */}
        <div className="mt-4 flex flex-col gap-1 rounded-[14px] shadow-in">
          <button
            type="button"
            className="flex items-center justify-between px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🏷️</span>
              <span className="text-sm font-semibold">標籤</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-ink-soft">
              新增標籤 <span>›</span>
            </div>
          </button>

          <div className="h-px bg-line" />

          <button
            type="button"
            className="flex items-center justify-between px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">📷</span>
              <span className="text-sm font-semibold">照片（最多 3 張）</span>
            </div>
            <span className="text-ink-soft">›</span>
          </button>
        </div>

        {/* 備註 */}
        <textarea
          placeholder="寫點備註吧……"
          rows={3}
          className="mt-4 w-full resize-none rounded-[14px] px-4 py-3.5 text-sm text-ink placeholder:text-ink-soft shadow-in outline-none"
        />

        {/* 底部按鈕 */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-[14px] py-3 text-sm font-bold text-ink shadow-in"
          >
            儲存
          </button>
          <button
            type="submit"
            className="flex-1 rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3 text-sm font-bold text-white shadow-out"
          >
            再記一筆
          </button>
        </div>
      </div>
    </div>
  );
}
