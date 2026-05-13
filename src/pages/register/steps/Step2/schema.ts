import { z } from 'zod';

const MIN_AGE = 14;
const MAX_AGE = 100;
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const step2Schema = z.object({
  avatar: z
    .instanceof(File)
    .nullable()
    .refine(
      (file) => file === null || file.size <= MAX_AVATAR_SIZE,
      'Файл не должен превышать 5 МБ'
    ),

  name: z
    .string()
    .min(1, 'Имя обязательно')
    .min(2, 'Имя должно содержать не менее 2 символов'),

  birthDate: z
    .date({ message: 'Выберите дату рождения' })
    .refine((date) => calculateAge(date) >= MIN_AGE, {
      message: `Возраст должен быть от ${MIN_AGE} лет`,
    })
    .refine((date) => calculateAge(date) <= MAX_AGE, {
      message: `Возраст должен быть не более ${MAX_AGE} лет`,
    }),

  gender: z.enum(['male', 'female', 'unspecified'], {
    message: 'Выберите пол',
  }),

  city: z.string().min(1, 'Выберите город'),

  learnCategories: z
    .array(z.string())
    .min(1, 'Выберите хотя бы одну категорию'),

  learnSubcategories: z
    .array(z.string())
    .min(1, 'Выберите хотя бы одну подкатегорию'),
});

export type Step2Data = z.infer<typeof step2Schema>;
