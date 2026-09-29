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

export interface RecordItemRead {
  id: number;
  categoryId: number;
  recordType: RecordType;
  amount: number;
  note?: string;
  expendedAt: string;
  tags?: number[];
  image?: {
    url: string;
    name: string;
  };
}

export interface RecordItem {
  id: number;
  categoryId: number;
  recordType: RecordType;
  amount: number;
  note?: string;
  expendedAt: string;
  tags?: number[];
  image?: File | null;
}

export type ImageItem =
  | {
      type: 'new';
      file: File | null;
    }
  | {
      type: 'old';
      url: string;
      name: string;
    };

export type DurationType = 'oneday' | 'week' | 'month' | 'custom';
