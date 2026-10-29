import { editCategoriesOrder } from '@/api';
import { queryKeys } from '@/api/queryKeys';
import type { CategoryItem } from '@/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditCategoryOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCategoriesOrder,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [queryKeys.accounting.categories],
        (old: CategoryItem[] | undefined) => {
          if (!old) return old;
          const { categoryIds, type } = variables;
          const orderedItems = categoryIds
            .map((id) => {
              return old.find((item) => id === item.id);
            })
            .filter((v) => !!v);
          let index = 0;
          const newItems = old
            .map((item) => {
              if (item.type !== type) {
                return item;
              }
              const newItem = orderedItems[index];
              index += 1;
              return newItem;
            })
            .filter((v) => !!v);

          return newItems;
        },
      );
      queryClient.invalidateQueries({
        queryKey: [queryKeys.accounting.categories],
      });
    },
  });
}
