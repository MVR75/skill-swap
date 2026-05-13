import { useEffect } from 'react';
import { Button } from '../Button/Button';
import type { NotificationModalProps, NotificationIcon } from './types';
import styles from './NotificationModal.module.css';

const ICON_SRC: Record<NotificationIcon, string> = {
  success: '/icons/notification-success.svg',
  error: '/icons/cross.svg',
  info: '/icons/notification-info.svg',
};

export const NotificationModal = ({
  isOpen,
  onClose,
  title,
  message,
  icon = 'success',
  buttonText = 'Готово',
}: NotificationModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-title"
      >
        <div className={styles.iconWrapper}>
          <img
            className={styles.icon}
            src={ICON_SRC[icon]}
            alt=""
            aria-hidden="true"
          />
        </div>

        <h2 id="notification-title" className={styles.title}>
          {title}
        </h2>

        <p className={styles.message}>{message}</p>

        <Button
          variant="primary"
          className={styles.button}
          onClick={onClose}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};