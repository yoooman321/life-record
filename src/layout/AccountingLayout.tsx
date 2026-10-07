import { Outlet } from 'react-router';

const SUB_NAV = [
  { key: 'slime', label: '史萊姆', icon: '🟢', current: true },
  { key: 'battle', label: '', icon: '⚔️', battle: true },
  { key: 'shop', label: '商店', icon: '🛍️' },
  { key: 'stats', label: '統計', icon: '📊' },
  { key: 'settings', label: '設定', icon: '⚙️' },
];

export default function AccountingLayout() {
  return (
    <>
      <div className="flex gap-6">
        <nav className="flex w-19 shrink-0 flex-col items-center gap-4.5 rounded-[20px] bg-panel py-7 shadow-out">
          {SUB_NAV.map((item) =>
            item.battle ? (
              <button
                key={item.key}
                type="button"
                aria-label="戰鬥"
                className="flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-accent-food to-[#ff9f73] text-xl text-white shadow-out"
              >
                {item.icon}
              </button>
            ) : (
              <button
                key={item.key}
                type="button"
                className={`flex w-14 flex-col items-center gap-1 rounded-[14px] py-2 text-[10px] font-bold ${
                  item.current ? 'text-ink' : 'text-ink-soft'
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-[12px] text-base ${
                    item.current ? 'bg-panel shadow-out' : ''
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            ),
          )}
        </nav>
        <Outlet />
      </div>
      {/* 領取寶藏：目前常駐顯示，實際要接條件邏輯（自動戰鬥結束後才出現） */}
      <button
        type="button"
        className="fixed right-10 bottom-10 flex items-center gap-2 rounded-full bg-linear-to-r from-accent-money to-[#e0aa6f] px-5.5 py-3.5 text-sm font-extrabold text-white shadow-out"
      >
        🎁 領取寶藏
      </button>
    </>
  );
}
