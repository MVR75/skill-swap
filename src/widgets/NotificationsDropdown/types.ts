export type NotificationStatus = 'new' | 'viewed';

export interface NotificationData {
  id: string;
  title: string;
  description: string;
  date: string;
  status: NotificationStatus;
  actionLabel?: string;
}

export interface NotificationsDropdownProps {
  isOpen: boolean;
  notifications?: NotificationData[];
  onClose?: () => void;
  onReadAll?: () => void;
  onClearViewed?: () => void;
  onAction?: (id: string) => void;
}