// TODO：目前是靜態畫面，永遠渲染在畫面上。實際使用時要自己包一層開關 state（是否顯示 modal）、
// 類別名稱 controlled input、能力值選取、icon 選取、送出邏輯，這些留給你練習。
// 這個 modal 只用來新增「支出」類別，收入類別是寫死的（收入/投資），不開放自訂，所以沒有類型切換，
// 能力值選項也排除鈔能力（鈔能力用金額累積，跟這裡其他用筆數累積的邏輯不同）。

const ABILITIES = ['力量', '敏捷', '運氣', '智力', '體力'];

const ICONS = ['🎮', '🎨', '🐾', '✈️', '📚'];

export default function AddCategoryModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-100 rounded-[20px] border border-line bg-panel p-6 shadow-sm">
        <button
          type="button"
          aria-label="關閉"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ✕
        </button>

        <div className="mb-5 text-center text-base font-bold">新增類別</div>

        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-ink-soft">
            類別名稱
          </label>
          <input
            type="text"
            placeholder="輸入類別名稱"
            className="rounded-[11px] px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft shadow-in outline-none"
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 text-[13px] font-bold text-ink-soft">
            對應能力值
          </div>
          <div className="flex flex-wrap gap-2">
            {ABILITIES.map((ability) => (
              <button
                key={ability}
                type="button"
                className={`rounded-full px-3.5 py-2 text-xs font-bold ${
                  ability === '力量'
                    ? 'bg-accent-money text-white shadow-out'
                    : 'text-ink-soft shadow-in'
                }`}
              >
                {ability}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <div className="mb-2 text-[13px] font-bold text-ink-soft">圖示</div>
          <div className="flex gap-3">
            {ICONS.map((icon, index) => (
              <button
                key={icon}
                type="button"
                className={`flex h-11 w-11 items-center justify-center rounded-full text-lg ${
                  index === 0
                    ? 'bg-accent-money/15 shadow-out ring-2 ring-accent-money'
                    : 'shadow-in'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3 text-sm font-bold text-white shadow-out"
        >
          新增類別
        </button>
      </div>
    </div>
  );
}
