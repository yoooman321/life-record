import * as z from 'zod';

export const schema = z
  .object({
    name: z.string('請輸入暱稱'),
    email: z.email('請輸入有效的 Email'),
    password: z.string('請輸入密碼').min(8, { message: '密碼至少需要8個字元' }),
    confirmPassword: z.string(),
    birthday: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z.iso.date().optional(),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: '兩次輸入的密碼不相符',
    path: ['confirmPassword'],
  });
