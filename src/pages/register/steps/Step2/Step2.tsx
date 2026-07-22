import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSelector } from '../../../../app/store';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui/button/Button';
import { AvatarUpload } from '../../../../shared/ui/AvatarUpload/AvatarUpload';

import { CategoryDropdown } from '../../ui/CategoryDropdown/CategoryDropdown';
import { DatePicker } from './ui/DatePicker/DatePicker';

import { step2Schema, type Step2Data } from './schema';
import { CITIES } from './cities';
import styles from './Step2.module.css';
import { useEffect, useState } from 'react';

type Step2Props = {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  initialData?: Partial<Step2Data>;
};

const GENDER_OPTIONS = [
  { value: 'unspecified', label: 'Не указан' },
  { value: 'male', label: 'Мужской' }, 
  { value: 'female', label: 'Женский' },
];

export function Step2({ onSubmit, onBack, initialData }: Step2Props) {
  const categories = useSelector((state) => state.categories.categories);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: 'onBlur',
    defaultValues: {
      avatar: initialData?.avatar ?? null,
      name: initialData?.name ?? '',
      birthDate: initialData?.birthDate,
      gender: initialData?.gender ?? 'unspecified',
      city: initialData?.city ?? '',
      learnCategories: initialData?.learnCategories ?? [],
      learnSubcategories: initialData?.learnSubcategories ?? [],
    },
  });

  const selectedCategories = watch('learnCategories');
  const selectedSubcategories = watch('learnSubcategories');
  const avatarFile = watch('avatar');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
  if (!avatarFile) {
    setPreviewUrl(null);
    return;
  }
  const objectUrl =
    URL.createObjectURL(avatarFile);
  setPreviewUrl(objectUrl);
  return () => {
    URL.revokeObjectURL(objectUrl);
  };
}, [avatarFile]);

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
    setValue('learnCategories', newCategories, { shouldValidate: true });

    const validSubcategoryIds = categories
      .filter((cat) => newCategories.includes(cat.id))
      .flatMap((cat) => cat.subcategories.map((sub) => sub.id));
    const currentSubcategories = selectedSubcategories;
    const filteredSubcategories = currentSubcategories.filter((id) =>
      validSubcategoryIds.includes(id)
    );
    setValue('learnSubcategories', filteredSubcategories, {
      shouldValidate: true,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <AvatarUpload previewUrl={previewUrl} value={field.value} onChange={field.onChange} icon={`${import.meta.env.BASE_URL}icons/Icon-regg.svg`}/>
          )}
        />
        {errors.avatar && (
          <span className={styles.error}>{errors.avatar.message}</span>
        )}
      </div>

      <Input
        label="Имя"
        placeholder="Введите ваше имя"
        error={errors.name?.message}
        {...register('name')}
      />

      <div className={styles.row}>
        <div className={styles.field}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Дата рождения"
                value={field.value ?? null}
                onChange={field.onChange}
              />
            )}
          />
          {errors.birthDate && (
            <span className={styles.error}>{errors.birthDate.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="gender">
            Пол
          </label>
          <select id="gender" className={styles.select} {...register('gender')}>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="city">
          Город
        </label>
        <select id="city" className={styles.select} {...register('city')}>
          <option value="">Не указан</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && (
          <span className={styles.error}>{errors.city.message}</span>
        )}
      </div>

      <CategoryDropdown
        label="Категория навыка, которому хотите научиться"
        placeholder="Выберите категорию"
        options={categoryOptions}
        value={selectedCategories}
        onChange={handleCategoriesChange}
      />
      {errors.learnCategories && (
        <span className={styles.error}>{errors.learnCategories.message}</span>
      )}

      <CategoryDropdown
        label="Подкатегория навыка, которому хотите научиться"
        placeholder="Выберите подкатегорию"
        options={subcategoryOptions}
        value={selectedSubcategories}
        onChange={(values) =>
          setValue('learnSubcategories', values, { shouldValidate: true })
        }
        disabled={selectedCategories.length === 0}
      />
      {errors.learnSubcategories && (
        <span className={styles.error}>
          {errors.learnSubcategories.message}
        </span>
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
