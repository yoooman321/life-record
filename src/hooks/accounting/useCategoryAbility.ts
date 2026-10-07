import type { SlimeStatName } from '@/type/slime';
import { useCategories } from './useCategories';
import { useSlimeStat } from './useSlimeStat';

export function useCategoryAbility() {
  const { data: categories } = useCategories();
  const { data: stats } = useSlimeStat();

  const getStatName = (categoryId: number): SlimeStatName | undefined => {
    const category = categories?.find((c) => c.id === categoryId);
    return stats?.find((s) => s.id === category?.addStatsId)?.name;
  };

  return {
    getStatName,
  };
}
