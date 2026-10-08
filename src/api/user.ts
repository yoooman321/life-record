import { api } from '@/utils/apiFetch';
import { z } from 'zod';
import { schema as loginSchema } from '@/schemas/login';
import { schema as registerSchema } from '@/schemas/register';

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
type AccessToken = {
  accessToken: string;
};

export const register = async (data: RegisterData): Promise<AccessToken> => {
  return api.post('/register', data);
};

export const login = async (data: LoginData): Promise<AccessToken> => {
  return api.post('/login', data);
};
