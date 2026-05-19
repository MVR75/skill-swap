import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSelector } from '../../app/store';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/button/Button';
import { CategoryDropdown } from '../../pages/register/ui/CategoryDropdown/CategoryDropdown';
import { ImageUpload } from '../../shared/ui/ImageUpload/ImageUpload';

import {
  skillOfferSchema,
  type SkillOfferFormData,
} from './model/schema';

import styles from './SkillOfferForm.module.css';

type SkillOfferFormProps = {
  onSubmit: (data: SkillOfferFormData) => void;
  onBack?: () => void;
  initialData?: Partial<SkillOfferFormData>;
  submitText?: string;
  backText?: string;
};

const PLACEHOLDER_IMAGE = new File([''], 'placeholder.jpg', {
  type: 'image/jpeg',
});

export function SkillOfferForm({
  onSubmit,
  onBack,
  initialData,
  submitText = 'Продолжить',
  backText = 'Назад',
}: SkillOfferFormProps) {
  const categories = useSelector((state) => state.categories.categories);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SkillOfferFormData>({
    resolver: zodResolver(skillOfferSchema),
    mode: 'onBlur',
    defaultValues: {
      teachTitle: initialData?.teachTitle ?? '',
      teachCategories: initialData?.teachCategories ?? [],
      teachSubcategories: initialData?.teachSubcategories ?? [],
      teachAbout: initialData?.teachAbout ?? '',
      teachImages: initialData?.teachImages ?? [PLACEHOLDER_IMAGE],
    },
  });

  const selectedCategories = watch('teachCategories');
  const selectedSubcategories = watch('teachSubcategories');

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.title,
  }));

  const subcategoryOptions = categories
    .filter((cat) => selectedCategories.includes(cat.id))
    .flatMap((cat) =>
      cat.subcategories.map((sub) => ({
        value: sub.id,
        label: sub.title,
      }))
    );

  const handleCategoriesChange = (newCategories: string[]) => {
    setValue('teachCategories', newCategories, { shouldValidate: true });
    setValue('teachSubcategories', [], { shouldValidate: true });
  };

  const handleSubcategoriesChange = (newSubcategories: string[]) => {
    setValue('teachSubcategories', newSubcategories, { shouldValidate: true });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Название навыка"
        placeholder="Введите название вашего навыка"
        error={errors.teachTitle?.message}
        {...register('teachTitle')}
      />

      <CategoryDropdown
        mode="single"
        label="Категория навыка"
        placeholder="Выберите категорию навыка"
        options={categoryOptions}
        value={selectedCategories}
        onChange={handleCategoriesChange}
      />

      {errors.teachCategories && (
        <span className={styles.error}>{errors.teachCategories.message}</span>
      )}

      <CategoryDropdown
        label="Подкатегория навыка"
        placeholder="Выберите подкатегорию навыка"
        options={subcategoryOptions}
        value={selectedSubcategories}
        onChange={handleSubcategoriesChange}
        disabled={selectedCategories.length === 0}
      />

      {errors.teachSubcategories && (
        <span className={styles.error}>
          {errors.teachSubcategories.message}
        </span>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="teachAbout">
          Описание
        </label>

        <textarea
          id="teachAbout"
          className={styles.textarea}
          placeholder="Коротко опишите, чему можете научить"
          rows={4}
          aria-invalid={errors.teachAbout ? true : undefined}
          aria-describedby={errors.teachAbout ? 'teachAbout-error' : undefined}
          {...register('teachAbout')}
        />

        {errors.teachAbout && (
          <span id="teachAbout-error" role="alert" className={styles.error}>
            {errors.teachAbout.message}
          </span>
        )}
      </div>

      <Controller
        name="teachImages"
        control={control}
        render={({ field }) => (
          <ImageUpload value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.teachImages && (
        <span className={styles.error}>{errors.teachImages.message}</span>
      )}

      <div className={styles.actions}>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {backText}
          </Button>
        )}

        <Button type="submit" variant="primary">
          {submitText}
        </Button>
      </div>
    </form>
  );
}