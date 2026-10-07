import type {
  DurationType,
  JobType,
  RecordItemRead,
  RecordType,
} from './accounting';
import type { SlimeStatName } from './slime';

// export interface
export interface RecordsQuery {
  startedAt: string;
  endedAt: string;
}

export interface UpdateRecordItem {
  id: number;
  categoryId?: number;
  amount?: number;
  note?: string;
  expendedAt?: string;
  tags?: number[];
  image?: File | null;
  removeImage?: boolean;
  removeTags?: boolean;
}

export interface CreateRecordItem {
  categoryId: number;
  recordType: RecordType;
  amount: number;
  note?: string;
  expendedAt: string;
  tags?: number[];
  image?: File | null;
}

export type CreatePeriodParams =
  | {
      durationType: Exclude<DurationType, 'custom'>;
    }
  | {
      durationType: 'custom';
      days: number;
    };

export type PeriodItem = {
  records: RecordItemRead[];
  stats: Record<SlimeStatName, number>;
  endedAt: string;
  startedAt: string;
};

export type SlimeItem = {
  id: number;
  profession: JobType;
  name: string;
};

export type EditSlimeItem = {
  id: number;
  name: string;
};
