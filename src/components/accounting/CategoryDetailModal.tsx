// TODO：目前是靜態畫面，永遠渲染在畫面上，資料也是寫死的假資料。
// 實際使用時要接：開關 state（點分類才顯示）、依日期分組的真實資料、
// 「日期／總額」排序切換邏輯，這些留給你練習。

const CATEGORY = {
  name: '飲食',
  icon: '🍱',
  color: 'var(--color-accent-food)',
};

const DAILY_GROUPS = [
  {
    date: '2026-09-17',
    total: 320,
    entries: [
      { note: '早餐 麵線', amount: 60 },
      { note: '午餐 便當', amount: 120 },
      { note: '晚餐 火鍋', amount: 140 },
    ],
  },
  {
    date: '2026-09-16',
    total: 185,
    entries: [
      { note: '超商咖啡', amount: 55 },
      { note: '晚餐 滷肉飯', amount: 130 },
    ],
  },
  {
    date: '2026-09-15',
    total: 90,
    entries: [{ note: '午餐 麵包', amount: 90 }],
  },
];

export default function CategoryDetailModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="fixed inset-y-0 right-0 flex h-full w-[85%] max-w-xs flex-col overflow-hidden rounded-l-[20px] rounded-r-none border border-line bg-panel shadow-sm md:static md:h-auto md:max-h-[80vh] md:w-full md:max-w-110 md:rounded-[20px]">
        {/* 分類色條標頭 */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            backgroundColor: `color-mix(in srgb, ${CATEGORY.color} 20%, transparent)`,
          }}
        >
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="text-lg">{CATEGORY.icon}</span>
            {CATEGORY.name}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 rounded-full bg-bg p-1">
              <button
                type="button"
                className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-ink shadow-out"
              >
                日期
              </button>
              <button
                type="button"
                className="rounded-full px-3 py-1 text-xs font-semibold text-ink-soft"
              >
                總額
              </button>
            </div>
            <button
              type="button"
              aria-label="關閉"
              className="flex h-7 w-7 items-center justify-center rounded-full text-base text-ink-soft shadow-in"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 明細列表 */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="mb-3 text-[13px] font-bold text-ink-soft">
            支出詳情
          </div>

          <div className="flex flex-col gap-4">
            {DAILY_GROUPS.map((group) => (
              <div key={group.date}>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold text-ink-soft">
                  <span>{group.date}</span>
                  <span className="text-accent-food">${group.total}</span>
                </div>
                <div className="flex flex-col gap-1 rounded-[14px] shadow-in">
                  {group.entries.map((entry, index) => (
                    <div key={entry.note}>
                      {index > 0 && <div className="h-px bg-line" />}
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-sm">{entry.note}</span>
                        <span className="text-sm font-bold">
                          ${entry.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
