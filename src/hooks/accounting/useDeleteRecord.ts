import { deleteRecord } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.accounting.records],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.accounting.period],
      });
    },
  });
}
