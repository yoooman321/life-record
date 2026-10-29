import { createCategory } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.accounting.categories],
      });
    },
  });
}
