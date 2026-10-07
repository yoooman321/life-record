import { editSlime } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditSlime() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editSlime,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.accounting.period],
      });
    },
  });
}
