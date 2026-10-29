// TODO：對應 bookkeeping-slime.md「能力值分配卡」的花費紀錄分頁：依日期列出目前 growing Period 內的花費。
// 留給你練習的部分：
// - 目前列表沒有互動（點擊沒反應），要不要點一筆可以編輯（重用 EntryForm）之後再決定
// - empty 狀態目前沒有區分「根本沒有 growing Period」跟「有 Period 但這期間還沒花費」，
//   這兩種語意不一樣（前者可能想導去 SlimeSetupModal），要看 API 之後怎麼回傳再細分

import { getWeekDay } from '@/utils/date';
import type { RecordItemRead, UpdateRecordItem } from '@/type';
import RecordItem from './RecordItem';
import { useState } from 'react';
import EntryModal from './EntryModal';
import { useUpdateRecord } from '@/hooks';
import type { EntryFormData } from './EntryForm';

// TODO: move in common
const isSameTags = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((id) => setB.has(id));
};

interface PeriodSpendingListProps {
  records: RecordItemRead[];
}

export default function PeriodSpendingList({
  records,
}: PeriodSpendingListProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordItemRead | null>(
    null,
  );

  const { mutate: updateRecord, isPending } = useUpdateRecord();

  const clickHandler = (record: RecordItemRead) => {
    setSelectedRecord(record);
    setOpenModal(true);
  };

  // TODO: move to hooks
  const submitHandler = (
    data: EntryFormData,
    options: { onSuccess: () => void },
  ) => {
    if (!selectedRecord) return;
    const body: UpdateRecordItem = { id: selectedRecord.id };
    if (data.categoryId !== selectedRecord?.category.id) {
      body.categoryId = data.categoryId;
    }
    if (data.amount !== selectedRecord.amount) {
      body.amount = data.amount;
    }
    if (data.expendedAt !== selectedRecord.expendedAt) {
      body.expendedAt = data.expendedAt;
    }

    if (data.note !== selectedRecord.note) {
      body.note = data.note;
    }

    if (!isSameTags(data.tags, selectedRecord.tags ?? [])) {
      if (data.tags.length === 0) {
        body.removeTags = true;
      } else {
        body.tags = data.tags;
      }
    }

    if (data.image.type === 'new') {
      if (data.image.file === null) {
        body.removeImage = true;
      } else {
        body.image = data.image.file;
      }
    }

    updateRecord(body, options);
  };

  if (!records || records.length === 0) {
    return (
      <div className="px-2 py-10 text-center text-xs text-ink-soft">
        這次培育期間還沒有花費紀錄
      </div>
    );
  }

  // 依 expendedAt 分組，日期新的排前面
  const groupedByDate = records.reduce<Record<string, typeof records>>(
    (acc, record) => {
      const key = record.expendedAt;
      acc[key] = [...(acc[key] ?? []), record];
      return acc;
    },
    {},
  );
  const sortedDates = Object.keys(groupedByDate).sort().reverse();

  return (
    <>
      <div>
        {sortedDates.map((date) => (
          <div key={date} className="mb-4 last:mb-0">
            <div className="mb-2 text-[11px] font-bold text-ink-soft">
              {date}・{getWeekDay(date)}
            </div>
            <div className="flex flex-col gap-1">
              {groupedByDate[date].map((record) => (
                <RecordItem
                  record={record}
                  key={record.id}
                  onClick={clickHandler}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <EntryModal
          onSubmit={submitHandler}
          isSubmitting={isPending}
          initialRecord={selectedRecord || undefined}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
}
