import { getIconList } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useIcons() {
  return useQuery({
    queryKey: [queryKeys.accounting.icons],
    queryFn: () => getIconList(),
  });
}
