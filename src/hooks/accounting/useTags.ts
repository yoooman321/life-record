import { getTagList } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useTags() {
  return useQuery({
    queryKey: [queryKeys.accounting.tags],
    queryFn: () => getTagList(),
  });
}
