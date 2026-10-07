import { getCategoryList } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery({
    queryKey: [queryKeys.accounting.categories],
    queryFn: () => getCategoryList(),
  });
}
