import type { NotificationData } from '../../types';
import styles from './NotificationItem.module.css';

interface NotificationItemProps {
  notification: NotificationData;
  onAction?: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  onAction,
}: NotificationItemProps) => {
  const { id, title, description, date, status, actionLabel } = notification;

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.textIcon}>
          <img
            className={styles.icon}
            src="/icons/idea.svg"
            alt=""
            aria-hidden="true"
          />
          <div className={styles.text}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <span className={styles.date}>{date}</span>
      </div>

      {status === 'new' && actionLabel && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => onAction?.(id)}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};