import { getCurrentPeriodSummary } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function usePeriodRecord() {
  return useQuery({
    queryKey: [queryKeys.accounting.period],
    queryFn: () => getCurrentPeriodSummary(),
  });
}
