// TODO：目前是靜態畫面。實際使用時要接：日期區間 preset 的選取邏輯、自訂區間的日期輸入、
// 全選/取消全選跟各分類 checkbox 的連動、送出後實際產生匯出檔案的邏輯，這些留給你練習。

const DATE_PRESETS = ['本月', '上個月', '今年', '近30天', '自訂區間'];

const CATEGORIES = [
  { name: '飲食', icon: '🍱' },
  { name: '交通', icon: '🚌' },
  { name: '社交', icon: '🎉' },
  { name: '學習/3C', icon: '💻' },
  { name: '居家/水電', icon: '🏠' },
  { name: '收入', icon: '💵' },
  { name: '投資', icon: '📈' },
];

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-md text-xs ${
        checked ? 'bg-accent-money text-white' : 'shadow-in'
      }`}
    >
      {checked && '✓'}
    </span>
  );
}

export default function AccountingExportPage() {
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
        <h1 className="text-[20px] font-bold">匯出記帳資料</h1>
      </div>

      {/* 日期區間 */}
      <div className="mb-6 rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-3 text-[13px] font-bold text-ink-soft">選擇區間</div>
        <div className="flex flex-wrap gap-2">
          {DATE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                preset === '自訂區間'
                  ? 'bg-accent-money text-white shadow-out'
                  : 'text-ink-soft shadow-in'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* 選了「自訂區間」才會顯示的日期輸入 */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="date"
            className="flex-1 rounded-[11px] px-3.5 py-2.5 text-sm text-ink shadow-in outline-none"
          />
          <span className="text-ink-soft">－</span>
          <input
            type="date"
            className="flex-1 rounded-[11px] px-3.5 py-2.5 text-sm text-ink shadow-in outline-none"
          />
        </div>
      </div>

      {/* 選擇類別 */}
      <div className="mb-6 rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-4 text-[13px] font-bold text-ink-soft">選擇類別</div>
        <div className="flex flex-col gap-1 rounded-[14px] shadow-in">
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3.5"
          >
            <Checkbox checked />
            <span className="text-sm font-bold">全選</span>
          </button>

          <div className="h-px bg-line" />

          {CATEGORIES.map((category, index) => (
            <div key={category.name}>
              {index > 0 && <div className="h-px bg-line" />}
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3.5"
              >
                <Checkbox checked />
                <span className="text-base">{category.icon}</span>
                <span className="text-sm font-semibold">{category.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3.5 text-sm font-bold text-white shadow-out"
      >
        匯出 CSV
      </button>
    </>
  );
}
