import { getSlimeStatSetting } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useSlimeStat() {
  return useQuery({
    queryKey: [queryKeys.accounting.slimeStat],
    queryFn: () => getSlimeStatSetting(),
  });
}
