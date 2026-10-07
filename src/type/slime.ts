export type SlimeStatName = 'cash' | 'str' | 'dex' | 'int' | 'luk' | 'power';

export interface SlimeStatItem {
  id: number;
  name: SlimeStatName;
  color: string;
}
