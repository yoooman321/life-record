import { useEntryForm } from '@/hooks/accounting/useEntryForm';
import DateSelector from './DateSelector';
import Tabs from './Tabs';
import CategoryList from './CategoryList';
import TagField from './TagField';
import FileSelector from './FileSelector';
import type { ImageItem, RecordItemRead } from '@/type';

export type EntryFormData = {
  categoryId: number;
  amount: number;
  note: string;
  expendedAt: string;
  tags: number[];
  image: ImageItem;
};

type EntryFormProps = {
  initialRecord?: RecordItemRead;
  onSubmit: (data: EntryFormData, options: { onSuccess: () => void }) => void;
  isPending: boolean;
  onSave: () => void;
  onBack?: () => void;
};

export default function EntryForm({
  initialRecord = undefined,
  onSubmit,
  isPending,
  onSave,
  onBack,
}: EntryFormProps) {
  const {
    expenseDate,
    setExpenseDate,
    type,
    handleTypeChange,
    amount,
    setAmount,
    filteredCategories,
    currentCategory,
    setSelectedCategory,
    selectedTags,
    handleTagsChange,
    resetTags,
    selectedFile,
    handleFileChange,
    note,
    setNote,
    resetForm,
  } = useEntryForm({ initialRecord });

  const handleSubmit = (onSuccess: () => void) => {
    onSubmit(
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
    <form>
      <fieldset disabled={isPending} className="contents">
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
            imageConfig={selectedFile}
            onFileChange={handleFileChange}
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

        <div className="mt-5 flex gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSave);
            }}
            type="submit"
            className="flex-1 rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3 text-sm font-bold text-white shadow-out"
          >
            儲存
          </button>
          {initialRecord ? (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-[14px] py-3 text-sm font-bold text-ink shadow-in"
            >
              返回
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleSubmit(resetForm);
              }}
              className="flex-1 rounded-[14px] py-3 text-sm font-bold text-ink shadow-in"
            >
              再記一筆
            </button>
          )}
          {/* <button
            type="button"
            onClick={() => {
              handleSubmit(resetForm);
            }}
            className="flex-1 rounded-[14px] py-3 text-sm font-bold text-ink shadow-in"
          >
            {initialRecord ? 再記一筆
          </button> */}
        </div>
      </fieldset>
    </form>
  );
}
