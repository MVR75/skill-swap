import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from '../../../../app/store';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui/button/Button';
import { CategoryDropdown } from '../../ui/CategoryDropdown/CategoryDropdown';
import { step3Schema, type Step3Data } from './schema';
import styles from './Step3.module.css';
import { ImageUpload } from '../../../../shared/ui/ImageUpload/ImageUpload';
import { useEffect, useState } from 'react';


type Step3Props = {
  onSubmit: (data: Step3Data) => void;
  onBack: () => void;
  initialData?: Partial<Step3Data>;
};

// const PLACEHOLDER_IMAGE = new File([''], 'placeholder.jpg', {
//   type: 'image/jpeg',
// });

const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export function Step3({ onSubmit, onBack, initialData }: Step3Props) {
  const categories = useSelector((state) => state.categories.categories);
  const [images, setImages] = useState([]);

  useEffect(()=>{
  setImages(Promise.all((initialData.teachImages||[]).map(toBase64)))
},[initialData.teachImages])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    mode: 'onBlur',
    defaultValues: {
      teachTitle: initialData?.teachTitle ?? '',
      teachCategories: initialData?.teachCategories ?? [],
      teachSubcategories: initialData?.teachSubcategories ?? [],
      teachAbout: initialData?.teachAbout ?? '',
      teachImages: initialData.teachImages || images,
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
        <Button variant="outline" onClick={onBack}>
          Назад
        </Button>
        <Button type="submit" variant="primary">
          Продолжить
        </Button>
      </div>
    </form>
  );
}
