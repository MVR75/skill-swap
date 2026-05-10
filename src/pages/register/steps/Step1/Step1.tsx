import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from '../../../../shared/ui/Button/Button';
import { step1Schema, type Step1Data } from './schema';
import styles from './Step1.module.css';

type Step1Props = {
  onSubmit: (data: Step1Data) => void;
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
};

export function Step1({ onSubmit, onGoogleClick, onAppleClick }: Step1Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: 'onBlur',
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Button
        variant="outline"
        leftIcon={<img src="/icons/google.svg" alt="" aria-hidden="true" />}
        onClick={onGoogleClick}
      >
        Продолжить с Google
      </Button>

      <Button
        variant="outline"
        leftIcon={<img src="/icons/apple.svg" alt="" aria-hidden="true" />}
        onClick={onAppleClick}
      >
        Продолжить с Apple
      </Button>

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>или</span>
        <span className={styles.dividerLine} />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="Введите email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Пароль"
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="Придумайте надёжный пароль"
        autoComplete="new-password"
        hint="Пароль должен содержать не менее 8 знаков"
        error={errors.password?.message}
        rightIcon={
          <button
            type="button"
            className={styles.eyeButton}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <img
              src={isPasswordVisible ? '/icons/eye.svg' : '/icons/eye-off.svg'}
              alt=""
              aria-hidden="true"
            />
          </button>
        }
        {...register('password')}
      />

      <Button type="submit" variant="primary">
        Далее
      </Button>
    </form>
  );
}
