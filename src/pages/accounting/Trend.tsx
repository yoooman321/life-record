// TODO：目前是靜態畫面。實際使用時要接：月/年/期間切換邏輯、月份切換（上一月/下一月）、
// 真正判斷「記帳是否滿兩個月」的邏輯（下面用 HAS_ENOUGH_DATA 這個常數示意兩種狀態，
// 拿掉常數換成真的判斷式），這些留給你練習。
// 這個頁面跟 AccountingStats（分類報告）是分開的獨立頁面，兩者之間要用單一頁籤內部切換、
// 還是各自獨立路由，也留給你決定怎麼接。

import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const HAS_ENOUGH_DATA = true;

const TREND_DATA = [
  { month: '4月', income: 52000, expense: 38000, net: 14000 },
  { month: '5月', income: 48000, expense: 41000, net: 7000 },
  { month: '6月', income: 55000, expense: 39500, net: 15500 },
  { month: '7月', income: 50000, expense: 45000, net: 5000 },
  { month: '8月', income: 60000, expense: 42000, net: 18000 },
  { month: '9月', income: 58000, expense: 42300, net: 15700 },
];

const STAT_CARDS = [
  {
    label: '收入',
    value: 58000,
    change: '↓ 2,000（3.3%）',
    color: 'var(--color-accent-body)',
  },
  {
    label: '支出',
    value: 42300,
    change: '↑ 300（0.7%）',
    color: 'var(--color-accent-food)',
  },
  {
    label: '本期收支',
    value: 15700,
    change: '↓ 2,300（12.8%）',
    color: 'var(--color-accent-exercise)',
  },
  {
    label: '總收支',
    value: 186000,
    change: '↑ 15,700（9.2%）',
    color: 'var(--color-accent-money)',
  },
];

export default function AccountingTrendPage() {
  return (
    <>
      <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
        {/* 月/年/期間 切換 */}
        <div className="mb-5 flex gap-1 rounded-full bg-bg p-1">
          <button
            type="button"
            className="flex-1 rounded-full bg-panel px-4 py-1.5 text-sm font-bold text-ink shadow-out"
          >
            月
          </button>
          <button
            type="button"
            className="flex-1 rounded-full px-4 py-1.5 text-sm font-semibold text-ink-soft"
          >
            年
          </button>
          <button
            type="button"
            className="flex-1 rounded-full px-4 py-1.5 text-sm font-semibold text-ink-soft"
          >
            期間
          </button>
        </div>

        {/* 月份導覽 */}
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            aria-label="上一月"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft shadow-in"
          >
            ‹
          </button>
          <div className="flex items-center gap-1 text-sm font-bold">
            2026年9月 <span className="text-ink-soft">▾</span>
          </div>
          <button
            type="button"
            aria-label="下一月"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft shadow-in"
          >
            ›
          </button>
        </div>

        {HAS_ENOUGH_DATA ? (
          <>
            {/* 收支趨勢組合圖：收入/支出柱狀 + 總收支折線 */}
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={TREND_DATA}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: 'var(--color-ink-soft)' }}
                    axisLine={{ stroke: 'var(--color-line)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: 'var(--color-ink-soft)' }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Bar
                    dataKey="income"
                    fill="var(--color-accent-body)"
                    radius={[6, 6, 0, 0]}
                    barSize={10}
                  />
                  <Bar
                    dataKey="expense"
                    fill="var(--color-accent-food)"
                    radius={[6, 6, 0, 0]}
                    barSize={10}
                  />
                  <Line
                    type="monotone"
                    dataKey="net"
                    stroke="var(--color-accent-money)"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* 圖例 */}
            <div className="mt-2 flex justify-center gap-5 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-body" />
                收入
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-food" />
                支出
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-money" />
                總收支
              </span>
            </div>

            {/* 統計卡片 */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {STAT_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[14px] p-4"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${card.color} 15%, transparent)`,
                  }}
                >
                  <div className="mb-1 text-[13px] font-semibold text-ink-soft">
                    {card.label}
                  </div>
                  <div className="mb-1 text-xl font-extrabold">
                    {card.value.toLocaleString()}
                  </div>
                  <div className="text-xs font-semibold text-ink-soft">
                    {card.change}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // 記帳不滿兩個月時的空狀態提示
          <div className="flex flex-col items-center gap-2 py-14 text-center">
            <span className="text-4xl">🌱</span>
            <div className="text-sm font-bold">還沒有足夠的紀錄</div>
            <p className="max-w-56 text-[13px] leading-relaxed text-ink-soft">
              持續記帳滿兩個月，這裡就會出現你的收支趨勢圖表
            </p>
          </div>
        )}
      </div>
    </>
  );
}
