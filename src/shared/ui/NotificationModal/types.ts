export type NotificationIcon = 'success' | 'error' | 'info';

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: NotificationIcon;
  buttonText?: string;
}