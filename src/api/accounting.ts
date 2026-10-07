import type {
  CategoryItem,
  IconItem,
  RecordItem,
  RecordsQuery,
  TagItem,
  RecordItemRead,
  UpdateRecordItem,
  CreatePeriodParams,
  PeriodItem,
  SlimeItem,
  EditSlimeItem,
} from '@/type';
import type { SlimeStatItem } from '@/type/slime';
import { api } from '@/utils/apiFetch';
import { objectToFormData } from '@/utils/formData';

export const getIconList = async (): Promise<IconItem[]> => {
  return api.get('/accounting/icons');
};

export const getCategoryList = async (): Promise<CategoryItem[]> => {
  return api.get('/accounting/categories');
};

export const getTagList = async (): Promise<TagItem[]> => {
  return api.get('/accounting/tags');
};

export const createTag = async (
  body: Omit<TagItem, 'id'>,
): Promise<TagItem> => {
  return api.post('/accounting/tags', body);
};

export const createRecord = async (
  body: Omit<RecordItem, 'id' | 'recordType'>,
): Promise<void> => {
  const formData = objectToFormData(body);
  return api.post('/accounting/record', formData, { useFormData: true });
};

export const getRecordsByDate = async (
  body: RecordsQuery,
): Promise<RecordItemRead[]> => {
  return api.get(
    `/accounting/records?started_at=${body.startedAt}&ended_at=${body.endedAt}`,
  );
};

export const updateRecord = async (
  body: UpdateRecordItem,
): Promise<RecordItemRead> => {
  const { id, ...rest } = body;
  const formData = objectToFormData(rest);

  return api.put(`/accounting/record/${id}`, formData, { useFormData: true });
};

export const getCurrentPeriodSummary = async (): Promise<PeriodItem | null> => {
  return api.get('/accounting/records/current-period');
};

export const createPeriod = async (data: CreatePeriodParams): Promise<void> => {
  return api.post('/accounting/period', data);
};

export const getSlimeStatSetting = async (): Promise<SlimeStatItem[]> => {
  return api.get('/accounting/stat');
};

export const finishCurrentPeriod = async (): Promise<SlimeItem> => {
  return api.put('/accounting/period/current/end');
};

export const editSlime = async (body: EditSlimeItem): Promise<SlimeItem> => {
  return api.put('/accounting/slime', body);
};

export const mockEndPeriodApi = (): Promise<SlimeItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        profession: 'thief',
        name: '戰士史萊姆',
      }); // 或隨機挑一個職業，方便測試不同結果
    }, 1000); // 模擬 API 要等 2 秒
  });
};
