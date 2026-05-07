import { z } from 'zod';

export const step1Schema = z.object({
  email: z.email('Введите корректный email').min(1, 'Email обязателен'),
  password: z.string().min(8, 'Пароль должен содержать не менее 8 знаков'),
});

export type Step1Data = z.infer<typeof step1Schema>;
