// TODO：目前是靜態畫面。實際使用時要接：月預算/年預算切換、月份切換（上一月/下一月）、
// 點擊各分類要進到編輯畫面（或直接變成 inline 可編輯）、
// 用真實記帳資料算出「支出」「餘額」「剩餘預算/天」「實際支出/天」
// （可以參考 AccountingCategoryReport 裡即時 SUM 的做法），這些留給你練習。

const TOTAL_BUDGET = 45000;
const TOTAL_SPENT = 42300;
const REMAINING_DAYS = 13;

const CATEGORY_BUDGETS = [
  { name: '飲食', icon: '🍱', budget: 15000, spent: 14805 },
  { name: '交通', icon: '🚌', budget: 6000, spent: 8460 },
  { name: '社交', icon: '🎉', budget: 6000, spent: 5076 },
  { name: '學習/3C', icon: '💻', budget: 8000, spent: 6345 },
  { name: '居家/水電', icon: '🏠', budget: 9000, spent: 7614 },
];

// 圓環：用 stroke-dasharray 算靜態終點（動畫留給你練習）
const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const totalPercent = Math.round((TOTAL_SPENT / TOTAL_BUDGET) * 100);
const ringOffset =
  RING_CIRCUMFERENCE - (Math.min(totalPercent, 100) / 100) * RING_CIRCUMFERENCE;

const remainingBudget = TOTAL_BUDGET - TOTAL_SPENT;
const remainingBudgetPerDay = (remainingBudget / REMAINING_DAYS).toFixed(2);
const daysElapsed = 30 - REMAINING_DAYS;
const spentPerDay = (TOTAL_SPENT / daysElapsed).toFixed(2);

export default function AccountingBudgetPage() {
  return (
    <>
      <div className="mb-6.5 flex items-center justify-between">
        <button
          type="button"
          aria-label="關閉"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ✕
        </button>
        <div className="flex gap-1 rounded-full bg-bg p-1">
          <button
            type="button"
            className="rounded-full bg-panel px-4 py-1.5 text-sm font-bold text-ink shadow-out"
          >
            月預算
          </button>
          <button
            type="button"
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-ink-soft"
          >
            年預算
          </button>
        </div>
        <div className="w-9" />
      </div>

      {/* 月份導覽 */}
      <div className="mb-6 flex items-center justify-between">
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

      {/* 總覽：圓環 + 預算/支出/餘額 */}
      <div className="mb-6 rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="flex items-center gap-6">
          <div className="relative h-32 w-32 shrink-0">
            <svg viewBox="0 0 120 120" className="-rotate-90">
              <circle
                cx="60"
                cy="60"
                r={RING_RADIUS}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r={RING_RADIUS}
                fill="none"
                stroke="var(--color-accent-money)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-extrabold">
              {totalPercent}%
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] text-ink-soft">預算</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">
                  ${TOTAL_BUDGET.toLocaleString()}
                </span>
                <button
                  type="button"
                  aria-label="編輯總預算"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-ink-soft shadow-in"
                >
                  ✎
                </button>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] text-ink-soft">支出</span>
              <span className="text-sm font-bold text-accent-food">
                ${TOTAL_SPENT.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ink-soft">餘額</span>
              <span className="text-sm font-bold">
                ${remainingBudget.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 各類別預算 */}
      <div className="mb-6 rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[13px] font-bold text-ink-soft">各類別預算</div>
          <div className="text-[13px] text-ink-soft">
            合計：$
            {CATEGORY_BUDGETS.reduce(
              (sum, c) => sum + c.budget,
              0,
            ).toLocaleString()}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {CATEGORY_BUDGETS.map((category) => {
            const percent = Math.min(
              (category.spent / category.budget) * 100,
              100,
            );
            const isOverBudget = category.spent > category.budget;
            const remaining = category.budget - category.spent;

            return (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{category.icon}</span>
                    <span className="text-sm font-semibold">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">
                      ${category.budget.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      aria-label={`編輯${category.name}預算`}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-ink-soft shadow-in"
                    >
                      ✎
                    </button>
                  </div>
                </div>
                <div className="mb-2 h-2 overflow-hidden rounded-lg shadow-in">
                  <div
                    className={`h-full rounded-lg ${
                      isOverBudget ? 'bg-accent-food' : 'bg-accent-body'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-ink-soft">
                  <span>
                    餘額：
                    <span className={isOverBudget ? 'text-accent-food' : ''}>
                      ${remaining.toLocaleString()}
                    </span>
                  </span>
                  <span>支出：${category.spent.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部統計 */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-xl font-extrabold">{REMAINING_DAYS}</div>
          <div className="text-xs text-ink-soft">剩餘天數</div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-accent-food">
            ${remainingBudgetPerDay}
          </div>
          <div className="text-xs text-ink-soft">剩餘預算／天</div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-accent-food">
            ${spentPerDay}
          </div>
          <div className="text-xs text-ink-soft">實際支出／天</div>
        </div>
      </div>
    </>
  );
}
