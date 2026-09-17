// TODO：目前固定顯示「分類報告」。實際使用時要接 useState 記錄 activeTab，
// 點擊下面兩個頁籤切換 activeTab，並依 activeTab 渲染 <AccountingCategoryReport />
// 或 <AccountingTrend />，這些留給你練習。

import AccountingCategoryReport from '@/pages/accounting/CategoryReport';

export default function AccountingStatsPage() {
  return (
    <>
      <div className="mb-6.5">
        <h1 className="mb-4 text-[26px]">統計</h1>
        <div className="flex w-fit gap-1 rounded-full bg-bg p-1">
          <button
            type="button"
            className="rounded-full bg-panel px-4 py-1.5 text-sm font-bold text-ink shadow-out"
          >
            分類報告
          </button>
          <button
            type="button"
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-ink-soft"
          >
            趨勢
          </button>
        </div>
      </div>

      <AccountingCategoryReport />
    </>
  );
}
