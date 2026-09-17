// TODO：目前是靜態畫面。實際使用時要接：區間選擇的 state、支出/收入切換邏輯、
// 點擊下方分類要跳出明細列表，這些留給你練習。

import type { PieLabelRenderProps, TooltipContentProps } from 'recharts';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import CategoryDetailModal from '@/components/accounting/CategoryDetailModal';

const EXPENSE_CATEGORIES = [
  {
    name: '飲食',
    icon: '🍱',
    amount: 14805,
    count: 45,
    color: 'var(--color-accent-food)',
  },
  {
    name: '交通',
    icon: '🚌',
    amount: 8460,
    count: 12,
    color: 'var(--color-accent-exercise)',
  },
  {
    name: '居家/水電',
    icon: '🏠',
    amount: 7614,
    count: 8,
    color: 'var(--color-accent-body)',
  },
  {
    name: '學習/3C',
    icon: '💻',
    amount: 6345,
    count: 5,
    color: 'var(--color-accent-money)',
  },
  {
    name: '社交',
    icon: '🎉',
    amount: 5076,
    count: 9,
    color: 'var(--color-accent-diary)',
  },
];

const TOTAL_EXPENSE = EXPENSE_CATEGORIES.reduce((sum, c) => sum + c.amount, 0);

// 把類別 icon 畫在圓餅圖外圍，位置用 midAngle 算出來（Recharts 的 label render props 會給角度資訊）
function renderCategoryIcon(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, outerRadius, index } = props;
  const RADIAN = Math.PI / 180;
  const radius = Number(outerRadius) + 20;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={16}
    >
      {EXPENSE_CATEGORIES[index ?? 0].icon}
    </text>
  );
}

// 點擊扇形後顯示的 tooltip：類別名稱、比例、金額
function CategoryTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload as (typeof EXPENSE_CATEGORIES)[number];
  const percentage = ((data.amount / TOTAL_EXPENSE) * 100).toFixed(1);
  return (
    <div className="rounded-[11px] border border-line bg-panel px-3.5 py-2.5 text-sm shadow-out">
      <div className="mb-1 font-bold">
        {data.icon} {data.name}
      </div>
      <div className="text-ink-soft">比例：{percentage}%</div>
      <div className="text-ink-soft">金額：${data.amount.toLocaleString()}</div>
    </div>
  );
}

export default function AccountingCategoryReport() {
  return (
    <>
      <CategoryDetailModal />

      <div className="mb-6.5 flex justify-end">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-panel px-4 py-2 text-[13px] text-ink-soft shadow-out"
        >
          2026/08/17 － 2026/09/17
          <span>▾</span>
        </button>
      </div>

      <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-1 rounded-full bg-bg p-1">
            <button
              type="button"
              className="rounded-full bg-panel px-4 py-1.5 text-sm font-bold text-ink shadow-out"
            >
              支出
            </button>
            <button
              type="button"
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-ink-soft"
            >
              收入
            </button>
          </div>
          <div className="text-right">
            <div className="text-[13px] text-ink-soft">損益</div>
            <div className="text-base font-extrabold text-accent-food">
              -$8,120
            </div>
          </div>
        </div>

        {/* 圓餅圖：中間疊放總額文字，外圍標示類別 icon，點擊扇形會跳出比例／金額的 tooltip */}
        <div className="relative mx-auto h-70 w-70">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={EXPENSE_CATEGORIES}
                dataKey="amount"
                nameKey="name"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
                stroke="none"
                label={renderCategoryIcon}
                labelLine={false}
              >
                {EXPENSE_CATEGORIES.map((category) => (
                  <Cell key={category.name} fill={category.color} />
                ))}
              </Pie>
              <Tooltip trigger="click" content={CategoryTooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[13px] text-ink-soft">支出</div>
            <div className="text-xl font-extrabold">
              ${TOTAL_EXPENSE.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-4 text-[13px] font-bold text-ink-soft">分類資訊</div>
        <div className="flex flex-col gap-1 rounded-[14px] shadow-in">
          {EXPENSE_CATEGORIES.map((category, index) => (
            <div key={category.name}>
              {index > 0 && <div className="h-px bg-line" />}
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-base"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${category.color} 15%, transparent)`,
                    }}
                  >
                    {category.icon}
                  </span>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{category.name}</div>
                    <div className="text-xs text-ink-soft">
                      {category.count} 筆
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  ${category.amount.toLocaleString()}
                  <span className="text-ink-soft">›</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
