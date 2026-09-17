import { NavLink, Outlet } from 'react-router';

const NAV_ITEMS = [
  { to: '/', label: '總覽', icon: '🏠', end: true, tint: 'bg-accent-money/15' },
  { to: '/accounting', label: '記帳', icon: '💰', tint: 'bg-accent-money/15' },
  { to: '/diet', label: '飲食', icon: '🍱', tint: 'bg-accent-food/15' },
  { to: '/body', label: '身體紀錄', icon: '⚖️', tint: 'bg-accent-body/15' },
  { to: '/exercise', label: '運動', icon: '🏃', tint: 'bg-accent-exercise/15' },
  { to: '/diary', label: '日記', icon: '📔', tint: 'bg-accent-diary/15' },
];

export default function RootLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-55 shrink-0 flex-col gap-1.5 p-4 pt-7">
        <div className="mx-2.5 mt-1.5 mb-7 flex items-center gap-2 text-[19px] font-extrabold">
          <span className="inline-block h-7.5 w-7.5 rounded-[10px] bg-linear-to-br from-accent-money to-accent-food" />
          生活紀錄
        </div>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[14px] px-3.5 py-3 text-sm font-semibold no-underline ${
                isActive
                  ? 'translate-x-1 bg-panel text-ink shadow-out'
                  : 'text-ink-soft hover:text-ink'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-7.5 w-7.5 items-center justify-center rounded-[9px] text-[15px] ${
                    isActive ? `${item.tint} shadow-in` : ''
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}

        <div className="mt-auto flex items-center gap-2.5 rounded-[14px] bg-panel p-3 shadow-out">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-accent-money to-accent-food text-[13px] font-bold text-white">
            F
          </div>
          <div className="text-xs text-ink-soft">
            <b className="block text-[13px] text-ink">Fei</b>連續使用 21 天
          </div>
        </div>
      </aside>

      <main className="max-w-245 flex-1 p-8 px-10 pb-15">
        <Outlet />
      </main>
    </div>
  );
}
