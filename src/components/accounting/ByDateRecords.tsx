// TODO：還剩一個沒做完：
// - list view / edit view 切換目前是直接互換，沒有 push/pop 的滑動轉場，
//   可以參考 by-date-records-a.html 的 .slide-panel 寫法

import { useDisplayRecords, useRecords, useUpdateRecord } from '@/hooks';
import { iconMapping } from '@/config/icons';
import { getFormattedDate, getWeekDay } from '@/utils/date';
import { useEffect, useRef, useState } from 'react';
import type { RecordItemRead, UpdateRecordItem } from '@/type';
import EntryForm, { type EntryFormData } from './EntryForm';

const isSameTags = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((id) => setB.has(id));
};

export default function ByDateRecords() {
  const [showPopover, setShowPopOver] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordItemRead | null>(
    null,
  );
  const [currentDate, setCurrentDate] = useState(
    getFormattedDate({ date: new Date() }),
  );

  const today = getFormattedDate({ date: new Date() });
  const { data: records } = useRecords({
    startedAt: currentDate,
    endedAt: currentDate,
  });

  const { displayedRecords } = useDisplayRecords({ records: records || [] });

  const total =
    records?.reduce((sum, r) => {
      if (r.recordType === 'expense') {
        return sum - r.amount;
      }
      return sum + r.amount;
    }, 0) ?? 0;

  const dateHandler = (day: number) => {
    setCurrentDate((prev) => {
      const date = new Date(prev);
      const currentDate = date.getDate();
      date.setDate(currentDate + day);

      return getFormattedDate({ date });
    });
  };

  const { mutate, isPending } = useUpdateRecord();

  // 點 popover 外面關閉：外層容器（pill + popover）掛 ref，document 上監聽 mousedown，
  // 點擊落在容器外才關閉；送出中（isPending）先不關，避免中斷正在進行的更新
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showPopover) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (isPending) return;
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowPopOver(false);
        setSelectedRecord(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover, isPending]);

  const submitHandler = (
    data: EntryFormData,
    options: { onSuccess: () => void },
  ) => {
    if (!selectedRecord) return;
    const body: UpdateRecordItem = { id: selectedRecord.id };
    if (data.categoryId !== selectedRecord?.categoryId) {
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

    mutate(body, options);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* 入口 pill：📅 今天・日期 + 筆數/小計 badge */}
      <button
        onClick={() => {
          setShowPopOver((prev) => !prev);
          setSelectedRecord(null);
        }}
        type="button"
        className="flex items-center gap-1.5 rounded-full bg-bg px-3 py-1.5 text-ink shadow-in"
      >
        <span className="text-xs">📅</span>
        <span className="text-[13px] font-bold">
          {currentDate === today && '今天・'}
          {currentDate}・{getWeekDay(currentDate)}
        </span>
        <span className="text-[10px] text-ink-soft">⌄</span>
        {displayedRecords && displayedRecords.length > 0 && (
          <span className="ml-1 rounded-full bg-accent-money/14 px-2 py-0.5 text-[11px] font-bold text-accent-money">
            {displayedRecords.length}筆 ·{' '}
            <span
              className={total > 0 ? 'text-accent-body' : 'text-accent-food'}
            >
              ${total.toLocaleString()}
            </span>
          </span>
        )}
      </button>

      {showPopover && (
        <div className="absolute top-full left-0 z-20 mt-2 w-80 overflow-hidden rounded-[20px] border border-line bg-panel shadow-sm">
          {selectedRecord ? (
            <div className="p-3">
              <EntryForm
                initialRecord={selectedRecord}
                onSubmit={submitHandler}
                isPending={isPending}
                onSave={() => {
                  setSelectedRecord(null);
                }}
                onBack={() => {
                  setSelectedRecord(null);
                }}
              ></EntryForm>
            </div>
          ) : (
            <>
              {/* list view */}
              <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
                <button
                  onClick={() => {
                    dateHandler(-1);
                  }}
                  type="button"
                  aria-label="前一天"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-bg text-xs text-ink-soft shadow-in"
                >
                  ‹
                </button>
                <span className="text-[13px] font-bold">
                  {currentDate === today && '今天・'}
                  {currentDate}・{getWeekDay(currentDate)}
                </span>
                <button
                  onClick={() => {
                    dateHandler(1);
                  }}
                  type="button"
                  aria-label="後一天"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-bg text-xs text-ink-soft shadow-in"
                >
                  ›
                </button>
              </div>

              <div className="max-h-70 overflow-y-auto p-2">
                {displayedRecords && displayedRecords.length > 0 ? (
                  displayedRecords.map((record) => (
                    <button
                      key={record.id}
                      type="button"
                      onClick={() => {
                        setSelectedRecord(record);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-[14px] px-2 py-2.5 text-left hover:bg-bg"
                    >
                      <span
                        className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full text-sm"
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
                        <span className="block text-[13px] font-bold text-ink">
                          {record.category.name}
                        </span>
                        <span className="block truncate text-xs text-ink-soft">
                          {record.note || ''}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 text-[13px] font-bold ${record.recordType === 'expense' ? 'text-accent-food' : 'text-accent-body'}`}
                      >
                        ${record.amount}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-xs text-ink-soft">
                    這天還沒有記帳紀錄
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
