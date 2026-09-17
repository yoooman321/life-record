// TODO：目前是靜態畫面。實際使用時要接：開關 toggle 的 state、新增/編輯固定收支的表單邏輯、
// 排程本身怎麼觸發（例如使用者開 APP 時檢查有沒有該產生的日期，自動生成對應 Entry）要另外設計，
// 這些留給你練習。

const RECURRING_ITEMS = [
  {
    name: '房租',
    type: 'expense',
    amount: 15000,
    schedule: '每月 5 號',
    enabled: true,
  },
  {
    name: '薪水',
    type: 'income',
    amount: 50000,
    schedule: '每月 25 號',
    enabled: true,
  },
  {
    name: 'Netflix 訂閱',
    type: 'expense',
    amount: 390,
    schedule: '每月 15 號',
    enabled: true,
  },
  {
    name: '健身房會員',
    type: 'expense',
    amount: 1200,
    schedule: '每月 1 號',
    enabled: false,
  },
];

export default function AccountingRecurringPage() {
  return (
    <>
      <div className="mb-6.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="返回"
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
          >
            ‹
          </button>
          <h1 className="text-[20px] font-bold">固定收支</h1>
        </div>
        <button
          type="button"
          aria-label="新增固定收支"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ＋
        </button>
      </div>

      <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="flex flex-col gap-1 rounded-[14px] shadow-in">
          {RECURRING_ITEMS.map((item, index) => (
            <div key={item.name}>
              {index > 0 && <div className="h-px bg-line" />}
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {item.type === 'income' ? '💵' : '📆'}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="text-xs text-ink-soft">{item.schedule}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-bold ${
                      item.type === 'income'
                        ? 'text-accent-body'
                        : 'text-accent-food'
                    }`}
                  >
                    {item.type === 'income' ? '+' : '-'}$
                    {item.amount.toLocaleString()}
                  </span>

                  {/* 開關 toggle：目前用 item.enabled 這個假資料示意兩種狀態 */}
                  <div
                    className={`flex h-6 w-11 items-center rounded-full p-0.5 ${
                      item.enabled ? 'bg-accent-money' : 'bg-line'
                    }`}
                  >
                    {/* TODO(練習動畫)：切換開關時可以加 transition-transform 讓圓點滑動更順 */}
                    <div
                      className={`h-5 w-5 rounded-full bg-white shadow-out ${
                        item.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
