import type { SlimeStatName } from '@/type/slime';

export const slimeStatNameMapping: Record<SlimeStatName, string> = {
  cash: '鈔能力',
  int: '智力',
  str: '力量',
  dex: '敏捷',
  luk: '幸運',
  power: '體力',
};

export const MIN_EARLY_END_AMOUNT = 4;
