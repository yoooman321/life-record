import { editCategory } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.accounting.categories],
      });
    },
  });
}
