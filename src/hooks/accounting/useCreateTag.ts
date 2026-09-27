import { createTag } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounting.tags] });
    },
  });
}
