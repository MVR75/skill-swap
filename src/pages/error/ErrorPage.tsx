import type { ErrorPageProps } from './types';
import styles from './ErrorPage.module.css';
import { Button } from '../../shared/ui/button/Button';
import { useNavigate } from 'react-router-dom';

export function ErrorPage({
  code = 404,
  title,
  message,
  onReportClick,
  onHomeClick,
}: ErrorPageProps) {
  const navigate = useNavigate();

  let defaultTitle = '';
  let defaultMessage = '';
  let iconSrc = '';

  if (code === 404) {
    defaultTitle = 'Страница не найдена';
    defaultMessage =
      'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже';
    iconSrc = '/icons/error-404.svg';
  } else if (code === 500) {
    defaultTitle = 'На сервере произошла ошибка';
    defaultMessage = 'Попробуйте позже или вернитесь на главную страницу';
    iconSrc = '/icons/error-500.svg';
  }

  const finalTitle = title ?? defaultTitle;
  const finalMessage = message ?? defaultMessage;

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
      return;
    }
    navigate('/');
  };

  const handleReportClick = () => {
    if (onReportClick) {
      onReportClick();
    }
  };

  return (
    <main className={styles.page}>
      <img
        src={iconSrc}
        alt=""
        className={styles.illustration}
        aria-hidden="true"
      />
      <h1 className={styles.title}>{finalTitle}</h1>
      <p className={styles.message}>{finalMessage}</p>
      <div className={styles.actions}>
        <div className={styles.actions}>
          <Button
            variant="outline"
            onClick={handleReportClick}
            className={styles.actionButton}
          >
            Сообщить об ошибке
          </Button>
          <Button
            variant="primary"
            onClick={handleHomeClick}
            className={styles.actionButton}
          >
            На главную
          </Button>
        </div>
      </div>
    </main>
  );
}
