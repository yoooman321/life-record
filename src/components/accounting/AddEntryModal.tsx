// TODO：目前是靜態畫面，永遠渲染在畫面上。實際使用時要自己包一層開關 state（是否顯示 modal）、
// 支出/收入 tab 的 active 邏輯、類別選取、每個欄位的 controlled input、送出邏輯，這些留給你練習。

import { useState } from 'react';
import CategoryList from './CategoryList';
import { useCategories, useCreateRecord } from '@/hooks';
import type { RecordType } from '@/type';
import Tabs from './Tabs';
import TagField from './TagField';
import FileSelector from './FileSelector';
import DateSelector from './DateSelector';
import { getFormattedDate } from '@/utils/date';

type AddEntryModalProps = {
  onClose: () => void;
};

export default function AddEntryModal({ onClose }: AddEntryModalProps) {
  const { data: categoryList } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [type, setType] = useState<RecordType>('expense');
  const [amount, setAmount] = useState('');
  const filteredCategories =
    categoryList?.filter((category) => category.type === type) || [];
  const handleTypeChange = (tab: RecordType) => {
    setSelectedCategory(null);
    setType(tab);
  };

  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const resetTags = () => {
    setSelectedTags([]);
  };
  const handleTagsChange = (tagId: number) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }
      return [...prev, tagId];
    });
  };
  const currentCategory =
    selectedCategory &&
    filteredCategories.find(({ id }) => id === selectedCategory)
      ? selectedCategory
      : (filteredCategories?.[0]?.id ?? 0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expenseDate, setExpenseDate] = useState(
    getFormattedDate({ date: new Date() }),
  );

  const resetForm = () => {
    setSelectedCategory(null);
    setType('expense');
    setAmount('0');
    setNote('');
    setSelectedTags([]);
    setSelectedFile(null);
  };
  const { mutate, isPending } = useCreateRecord();
  const handleCreateRecord = (onSuccess?: () => void) => {
    mutate(
      {
        categoryId: currentCategory,
        amount: Number(amount),
        note,
        expendedAt: expenseDate,
        tags: selectedTags,
        image: selectedFile,
      },
      {
        onSuccess,
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-black/40 p-4">
      <div className="relative m-auto w-full max-w-[440px] rounded-[20px] border border-line bg-panel p-6 shadow-sm">
        {/* 關閉：右上角 */}
        <button
          type="button"
          aria-label="關閉"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 日期 */}
        <DateSelector
          selectedDate={expenseDate}
          onDateChange={setExpenseDate}
        />

        <div className="flex flex-col gap-1 rounded-[14px] shadow-in">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="text-lg">💱</span>
              <span className="text-sm font-semibold">類型</span>
            </div>
            <Tabs
              tabs={[
                {
                  label: '支出',
                  id: 'expense',
                },
                {
                  label: '收入',
                  id: 'income',
                },
              ]}
              currentTab={type}
              onChange={handleTypeChange}
            />
          </div>

          <div className="h-px bg-line" />

          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="text-lg">💰</span>
              <span className="text-sm font-semibold">金額</span>
            </div>
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              placeholder="輸入金額"
              className="w-32 text-right text-sm text-ink placeholder:text-ink-soft outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          {filteredCategories.length > 0 && (
            <CategoryList
              key={type}
              categories={filteredCategories}
              selectedCategory={currentCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}
        </div>

        {/* 欄位列表：標籤 + 照片 */}
        <div className="mt-4 flex flex-col gap-1 rounded-[14px] shadow-in">
          <TagField
            selectedTags={selectedTags}
            onToggle={handleTagsChange}
            onReset={resetTags}
          />

          <div className="h-px bg-line" />

          <FileSelector
            selectedFile={selectedFile}
            onFileChange={setSelectedFile}
          />
        </div>

        {/* 備註 */}
        <textarea
          placeholder="寫點備註吧……"
          rows={3}
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          className="mt-4 w-full resize-none rounded-[14px] px-4 py-3.5 text-sm text-ink placeholder:text-ink-soft shadow-in outline-none"
        />

        {/* 底部按鈕 */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => {
              handleCreateRecord(onClose);
            }}
            disabled={isPending}
            type="button"
            className="flex-1 rounded-[14px] py-3 text-sm font-bold text-ink shadow-in"
          >
            儲存
          </button>
          <button
            type="submit"
            onClick={() => {
              handleCreateRecord(resetForm);
            }}
            disabled={isPending}
            className="flex-1 rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3 text-sm font-bold text-white shadow-out"
          >
            再記一筆
          </button>
        </div>
      </div>
    </div>
  );
}
