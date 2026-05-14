import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../shared/ui/button/Button'
import { Input } from '../../../../shared/ui/Input/Input';
import styles from './Step3.module.css';

const schema = z.object({
  skillName: z.string().min(1, { message: 'Название навыка обязательно' }),
  category: z.string().min(1, { message: 'Категория обязательна' }),
  subcategory: z.string().min(1, { message: 'Подкатегория обязательна' }),
  description: z.string().min(1, { message: 'Описание обязательно' }),
  image: z.string().min(1, { message: 'Изображение обязательно' }),
});

interface Step3Data {
  skillName: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
}

interface Step3Props {
  onSubmit: (data: Step3Data) => void;
  onBackClick?: () => void;
}

export const Step3 = ({ onSubmit, onBackClick }: Step3Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(schema),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Название навыка"
          type="text"
          placeholder="Введите название навыка"
          error={errors.skillName?.message}
          {...register('skillName')}
        />

      <div className={styles.formGroup}>
        <label>Категория навыка</label>
        <select {...register('category')} className={styles.inputField}>
          <option value="">Выберите категорию навыка</option>
          <option value="">Бизнес и Карьера</option>
          <option value="">Творчество и Искусство</option>
          <option value="">Иностранные Языки</option>
          <option value="">Иностранные Языки</option>
          <option value="">Здоровье и лайфстайл</option>
          <option value="">Дом и Уют</option>
        </select>
      </div>

        <div className={styles.formGroup}>
        <label>Подкатегория навыка</label>
        <select {...register('subcategory')} className={styles.inputField}>
          <option value="">Выберите подкатегорию навыка</option>
          <option value="frontend">Рисование и Иллюстрация</option>
          <option value="backend">Фотография</option>
          <option value="">Видеомонтаж</option>
          <option value="frontend">Музыка и звук</option>
          <option value="backend">Актёрское мастерство</option>
          <option value="">Креативное письмо</option>
          <option value="frontend">Арт-терапия</option>
          <option value="backend">Декор и DIY</option>
        </select>
      </div>
        
         <Input
          label="Описание"
          type="textarea"
          style={{height: '96px',}}
          placeholder="Коротко опишите, чему можете научить"
          autoComplete="Описание"
          {...register('description')}
        />
        
        <Input
          label=""
          type="file"
          placeholder="Коротко опишите, чему можете научить"
          style={{height: '96px',}}
          {...register('image')}
        />
          
            <Button type="button" onClick={onBackClick} variant="outline" className='back'>
            Назад
          </Button>
          <Button type="submit" variant="primary" className='forward'>
            Продолжить
          </Button>
         

    </form>
  );
};