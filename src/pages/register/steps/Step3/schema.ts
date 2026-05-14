import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 6;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg'];

export const step3Schema = z.object({
  teachTitle: z
    .string()
    .min(3, 'Название должно содержать не менее 3 символов')
    .max(50, 'Название не должно превышать 50 символов'),

  teachCategories: z
    .array(z.string())
    .min(1, 'Выберите категорию')
    .max(1, 'Можно выбрать только одну категорию'),

  teachSubcategories: z
    .array(z.string())
    .min(1, 'Выберите хотя бы одну подкатегорию'),

  teachAbout: z
    .string()
    .min(10, 'Описание должно содержать не менее 10 символов')
    .max(500, 'Описание не должно превышать 500 символов'),

  teachImages: z
    .array(z.instanceof(File))
    .min(1, 'Добавьте хотя бы одно изображение')
    .max(MAX_IMAGES, `Можно загрузить не более ${MAX_IMAGES} изображений`)
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Допустимы только файлы JPG'
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_IMAGE_SIZE),
      'Файл не должен превышать 5 МБ'
    ),
});

export type Step3Data = z.infer<typeof step3Schema>;
