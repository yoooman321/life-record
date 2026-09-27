import type { CategoryItem, IconItem, RecordItem, TagItem } from '@/type';
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
  body: Omit<RecordItem, 'id'>,
): Promise<void> => {
  const formData = objectToFormData(body);
  return api.post('/accounting/record', formData, { useFormData: true });
};
