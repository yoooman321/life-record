// TODO：對應 bookkeeping-slime.md「能力值分配卡」的花費紀錄分頁：依日期列出目前 growing Period 內的花費。
// 留給你練習的部分：
// - 目前列表沒有互動（點擊沒反應），要不要點一筆可以編輯（重用 EntryForm）之後再決定
// - empty 狀態目前沒有區分「根本沒有 growing Period」跟「有 Period 但這期間還沒花費」，
//   這兩種語意不一樣（前者可能想導去 SlimeSetupModal），要看 API 之後怎麼回傳再細分

import { useDisplayRecords } from '@/hooks/accounting/useDisplayRecords';
import { iconMapping } from '@/config/icons';
import { getWeekDay } from '@/utils/date';
import type { RecordItemRead } from '@/type';

interface PeriodSpendingListProps {
  records: RecordItemRead[];
}

export default function PeriodSpendingList({
  records,
}: PeriodSpendingListProps) {
  const { displayedRecords } = useDisplayRecords({ records: records ?? [] });

  if (!displayedRecords || displayedRecords.length === 0) {
    return (
      <div className="px-2 py-10 text-center text-xs text-ink-soft">
        這次培育期間還沒有花費紀錄
      </div>
    );
  }

  // 依 expendedAt 分組，日期新的排前面
  const groupedByDate = displayedRecords.reduce<
    Record<string, typeof displayedRecords>
  >((acc, record) => {
    const key = record.expendedAt;
    acc[key] = [...(acc[key] ?? []), record];
    return acc;
  }, {});
  const sortedDates = Object.keys(groupedByDate).sort().reverse();

  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date} className="mb-4 last:mb-0">
          <div className="mb-2 text-[11px] font-bold text-ink-soft">
            {date}・{getWeekDay(date)}
          </div>
          <div className="flex flex-col gap-1">
            {groupedByDate[date].map((record) => (
              <div
                key={record.id}
                className="flex items-center gap-2.5 rounded-[14px] px-1.5 py-2"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
                  style={{
                    color: record.category.color,
                    backgroundColor: `color-mix(in srgb, ${record.category.color} 18%, transparent)`,
                  }}
                >
                  {record.category.iconId
                    ? iconMapping[record.category.iconId]
                    : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-ink">
                    {record.category.name}
                  </span>
                  <span className="block truncate text-[11px] text-ink-soft">
                    {record.note || '－'}
                  </span>
                </span>
                <span
                  className={`shrink-0 text-xs font-bold ${record.recordType === 'expense' ? 'text-accent-food' : 'text-accent-body'}`}
                >
                  ${record.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
