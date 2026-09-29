import { useState } from 'react';
import { useCategories } from './useCategories';
import type { RecordItemRead, RecordType, ImageItem } from '@/type';
import { getFormattedDate } from '@/utils/date';

type UseEntryFormProps = {
  initialRecord?: RecordItemRead | undefined;
};

const getDefaultValues = (initialRecord: RecordItemRead | undefined) => {
  return {
    selectedCategory: initialRecord?.categoryId || null,
    type: initialRecord?.recordType || 'expense',
    amount: initialRecord?.amount || '',
    note: initialRecord?.note || '',
    selectedTags: initialRecord?.tags || [],
    expenseDate: getFormattedDate({
      date: initialRecord ? new Date(initialRecord?.expendedAt) : new Date(),
    }),
    imageConfig: initialRecord
      ? ({
          type: 'old',
          url: initialRecord.image?.url || '',
          name: initialRecord.image?.name || '',
        } satisfies ImageItem)
      : ({ type: 'new', file: null } satisfies ImageItem),
  };
};

export function useEntryForm({ initialRecord }: UseEntryFormProps) {
  const defaultValues = getDefaultValues(initialRecord);
  const { data: categoryList } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    defaultValues.selectedCategory,
  );
  const [type, setType] = useState<RecordType>(defaultValues.type);
  const [amount, setAmount] = useState(defaultValues.amount);
  const handleTypeChange = (tab: RecordType) => {
    setSelectedCategory(null);
    setType(tab);
  };
  const [note, setNote] = useState(defaultValues.note);
  const [selectedTags, setSelectedTags] = useState<number[]>(
    defaultValues.selectedTags,
  );
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
  const filteredCategories =
    categoryList?.filter((category) => category.type === type) || [];
  const [selectedFile, setSelectedFile] = useState<ImageItem>(
    defaultValues.imageConfig,
  );
  const handleFileChange = (file: File | null) => {
    setSelectedFile({
      type: 'new',
      file,
    });
  };
  const [expenseDate, setExpenseDate] = useState(defaultValues.expenseDate);
  const resetForm = () => {
    setSelectedCategory(defaultValues.selectedCategory);
    setType(defaultValues.type);
    setAmount(defaultValues.amount);
    setNote(defaultValues.note);
    setSelectedTags(defaultValues.selectedTags);
    setSelectedFile(defaultValues.imageConfig);
  };

  const currentCategory =
    selectedCategory &&
    filteredCategories.find(({ id }) => id === selectedCategory)
      ? selectedCategory
      : (filteredCategories?.[0]?.id ?? 0);

  return {
    expenseDate,
    type,
    amount,
    setExpenseDate,
    handleTypeChange,
    setAmount,
    filteredCategories,
    currentCategory,
    setSelectedCategory,
    selectedTags,
    handleTagsChange,
    resetTags,
    selectedFile,
    setNote,
    note,
    resetForm,
    handleFileChange,
  };
}
