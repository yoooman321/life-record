import { useDeleteRecord } from '@/hooks';
import SwipeableRow from './SwipeableRow';
import { iconMapping } from '@/config/icons';
import { useState } from 'react';
import { useConfirm } from '../ui/dialog/DialogContext';
import type { RecordItemRead } from '@/type';

type RecordItemProps = {
  record: RecordItemRead;
  onClick: (record: RecordItemRead) => void;
};

export default function RecordItem({ record, onClick }: RecordItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const confirm = useConfirm();
  const { mutate: deleteRecord } = useDeleteRecord();
  const onDelete = async () => {
    const ok = await confirm({ title: '你確定要刪除嗎？' });
    if (ok) {
      deleteRecord(record.id);
    }
  };

  const children = (
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

  return (
    <>
      <SwipeableRow
        children={children}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onDelete={onDelete}
        onClick={() => {
          onClick(record);
        }}
      ></SwipeableRow>
    </>
  );
}
