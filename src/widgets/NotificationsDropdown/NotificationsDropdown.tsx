import { useEffect, useRef } from 'react';
import { NotificationItem } from './ui/NotificationItem/NotificationItem';
import { mockNotifications } from './mockData';
import type { NotificationsDropdownProps } from './types';
import styles from './NotificationsDropdown.module.css';

export const NotificationsDropdown = ({
  isOpen,
  notifications = mockNotifications,
  onClose,
  onReadAll,
  onClearViewed,
  onAction,
}: NotificationsDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const newNotifications = notifications.filter((n) => n.status === 'new');
  const viewedNotifications = notifications.filter(
    (n) => n.status === 'viewed',
  );

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      role="dialog"
      aria-label="Уведомления"
    >
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Новые уведомления</h2>
          {newNotifications.length > 0 && (
            <button
              type="button"
              className={styles.sectionAction}
              onClick={onReadAll}
            >
              Прочитать все
            </button>
          )}
        </div>

        {newNotifications.length > 0 ? (
          <div className={styles.list}>
            {newNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAction={onAction}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Новых уведомлений нет</p>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Просмотренные</h2>
          {viewedNotifications.length > 0 && (
            <button
              type="button"
              className={styles.sectionAction}
              onClick={onClearViewed}
            >
              Очистить
            </button>
          )}
        </div>

        {viewedNotifications.length > 0 ? (
          <div className={styles.list}>
            {viewedNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAction={onAction}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Нет просмотренных уведомлений</p>
        )}
      </section>
    </div>
  );
};