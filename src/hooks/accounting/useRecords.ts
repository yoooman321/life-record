import { getRecordsByDate } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import type { RecordsQuery } from '@/type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useRecords({ startedAt, endedAt }: RecordsQuery) {
  return useQuery({
    queryKey: [queryKeys.accounting.records, { startedAt, endedAt }],
    queryFn: () => getRecordsByDate({ startedAt, endedAt }),
    enabled: Boolean(startedAt && endedAt),
    // 效果：切換日期時，新的 queryKey 觸發重新抓取，在新資料回來之前，畫面繼續顯示上一天的資料
    placeholderData: keepPreviousData,
  });
}
