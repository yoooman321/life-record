import * as z from 'zod';

export const schema = z.object({
  email: z.email('請輸入有效的 Email'),
  password: z.string('請輸入密碼').min(8, { message: '密碼至少需要8個字元' }),
});
