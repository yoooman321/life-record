import type { DisplayedRecord } from '@/hooks';
import SwipeableRow from './SwipeableRow';
import { iconMapping } from '@/config/icons';
import { useState } from 'react';

type RecordItemProps = {
  record: DisplayedRecord;
};

export default function RecordItem({ record }: RecordItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onDelete = () => {
    console.log('delete');
  };
  const onClick = () => {
    console.log('onClick');
  };

  //    <button
  //                       key={record.id}
  //                       type="button"
  //                       onClick={() => {
  //                         setSelectedRecord(record);
  //                       }}
  //                       className="flex w-full items-center gap-2.5 rounded-[14px] px-2 py-2.5 text-left hover:bg-bg"
  //                     >
  //                       <span
  //                         className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full text-sm"
  //                         style={{
  //                           color: record.category.color,
  //                           backgroundColor: `color-mix(in srgb, ${record.category.color} 18%, transparent)`,
  //                         }}
  //                       >
  //                         {record.category.iconId
  //                           ? iconMapping[record.category.iconId]
  //                           : null}
  //                       </span>
  //                       <span className="min-w-0 flex-1">
  //                         <span className="block text-[13px] font-bold text-ink">
  //                           {record.category.name}
  //                         </span>
  //                         <span className="block truncate text-xs text-ink-soft">
  //                           {record.note || ''}
  //                         </span>
  //                       </span>
  //                       <span
  //                         className={`shrink-0 text-[13px] font-bold ${record.recordType === 'expense' ? 'text-accent-food' : 'text-accent-body'}`}
  //                       >
  //                         ${record.amount}
  //                       </span>
  //                     </button>
  const children = (
    // TODO 外面改成 button
    <div
      key={record.id}
      className="flex items-center gap-2.5 rounded-[14px] px-1.5 py-2"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm p-1.5"
        style={{
          color: record.category.color,
          backgroundColor: `color-mix(in srgb, ${record.category.color} 18%, transparent)`,
        }}
      >
        {record.category.iconId ? iconMapping[record.category.iconId] : null}
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
  );

  console.log('ccc', children);
  return (
    <>
      <SwipeableRow
        children={children}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onDelete={onDelete}
        onClick={onClick}
      ></SwipeableRow>
    </>
  );
}
