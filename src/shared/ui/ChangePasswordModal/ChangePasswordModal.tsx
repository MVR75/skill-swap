import { useState } from 'react';
import { Button } from '../button/Button';
import { Input } from '../Input/Input';
import styles from './ChangePasswordModal.module.css';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPassword: string) => void;
  currentPassword?: string;
};

export function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
  currentPassword = '',
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (currentPassword && oldPassword !== currentPassword) {
      setError('Неверный текущий пароль');
      return;
    }

    if (newPassword.length < 8) {
      setError('Новый пароль должен содержать не менее 8 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Новый пароль и подтверждение не совпадают');
      return;
    }

    onSuccess(newPassword);
    handleClose();
  };

  const handleClose = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Изменение пароля</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Текущий пароль"
            type={showOldPassword ? 'text' : 'password'}
            placeholder="Введите текущий пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className={styles.eyeButton}
              >
                <img
                  src={showOldPassword ? `${import.meta.env.BASE_URL}icons/eye.svg` : `${import.meta.env.BASE_URL}icons/eye-off.svg`}
                  alt=""
                />
              </button>
            }
          />

          <Input
            label="Новый пароль"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Введите новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            hint="Пароль должен содержать не менее 8 символов"
            rightIcon={
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={styles.eyeButton}
              >
                <img
                  src={showNewPassword ? `${import.meta.env.BASE_URL}icons/eye.svg` : `${import.meta.env.BASE_URL}icons/eye-off.svg`}
                  alt=""
                />
              </button>
            }
          />

          <Input
            label="Подтверждение пароля"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Подтвердите новый пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.eyeButton}
              >
                <img
                  src={showConfirmPassword ? `${import.meta.env.BASE_URL}icons/eye.svg` : `${import.meta.env.BASE_URL}icons/eye-off.svg`}
                  alt=""
                />
              </button>
            }
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}