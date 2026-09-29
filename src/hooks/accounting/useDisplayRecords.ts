import type { RecordItemRead } from '@/type';
import { useCategories } from './useCategories';

type UseDisplayRecordsProps = {
  records: RecordItemRead[];
};
export function useDisplayRecords({ records }: UseDisplayRecordsProps) {
  const { data: categoryList } = useCategories();

  const getCategoryData = (targetId: number) => {
    const category = categoryList?.find(({ id }) => id === targetId);
    return {
      color: category?.color,
      iconId: category?.iconId,
      name: category?.name,
    };
  };

  const displayedRecords = records?.map((record) => {
    return {
      ...record,
      category: getCategoryData(record.categoryId),
    };
  });

  return {
    categoryList,
    displayedRecords,
  };
}
