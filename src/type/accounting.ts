export type RecordType = 'income' | 'expense';

export interface CategoryItem {
  id: number;
  name: string;
  iconId: number;
  addStatsId: number;
  userId: number;
  type: RecordType;
  color: string;
}

export interface IconItem {
  id: number;
  name: string;
}

export interface TagItem {
  id: number;
  name: string;
  color: string;
}

export interface RecordItem {
  id: number;
  categoryId: number;
  amount: number;
  note?: string;
  expendedAt: string;
  tags?: number[];
  image?: File | null;
}
