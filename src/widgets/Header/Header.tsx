import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;

  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoutClick?: () => void;

  onNotificationsClick?: () => void;
  onFavoritesClick?: () => void;
  onProfileClick?: () => void;
  onSkillsClick?: () => void;
}

export function Header({
  isAuthenticated = false,
  userName = 'User',
  userAvatar,
  showSearch = true,
  searchValue = '',
  onSearchChange,
  onLoginClick,
  onRegisterClick,
  onNotificationsClick,
  onFavoritesClick,
  onProfileClick,
  onSkillsClick,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logoLink}
        aria-label="Перейти на главную страницу"
      >
        <img src="/logo.svg" alt="SkillSwap" className={styles.logo} />
      </Link>

      <nav className={styles.nav} aria-label="Основная навигация">
        <a href="#about" className={styles.navLink}>
          О проекте
        </a>
        <button
          type="button"
          className={styles.skillsButton}
          onClick={onSkillsClick}
        >
          Все навыки
          <img
            src="/public/icons/vector.svg"
            alt=""
            className={styles.chevronIcon}
            aria-hidden="true"
          />
        </button>
      </nav>

      {showSearch && (
        <label htmlFor="header-search" className={styles.search}>
          <img
            src="/public/icons/search.svg"
            alt=""
            className={styles.searchIcon}
            aria-hidden="true"
          />
          <input
            id="header-search"
            className={styles.searchInput}
            type="search"
            placeholder="Искать навык"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
        </label>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Переключить тему"
        >
          <img
            src="/public/icons/moon.svg"
            alt=""
            className={styles.themeIcon}
            aria-hidden="true"
          />
        </button>

        {isAuthenticated ? (
          <>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Открыть уведомления"
              onClick={onNotificationsClick}
            >
              <img
                src="/public/icons/notification.svg"
                alt=""
                className={styles.actionIcon}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Открыть избранное"
              onClick={onFavoritesClick}
            >
              <img
                src="/public/icons/like.svg"
                alt=""
                className={styles.actionIcon}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className={styles.userButton}
              onClick={onProfileClick}
            >
              <span className={styles.userName}>{userName}</span>
              {userAvatar ? (
                <img src={userAvatar} alt="" className={styles.avatar} />
              ) : (
                <img
                  src="/public/icons/user-circle.svg"
                  alt=""
                  className={styles.avatar}
                  aria-hidden="true"
                />
              )}
            </button>
          </>
        ) : (
          <div className={styles.authButtons}>
            <button
              type="button"
              className={styles.loginButton}
              onClick={onLoginClick}
            >
              Войти
            </button>
            <button
              type="button"
              className={styles.registerButton}
              onClick={onRegisterClick}
            >
              Регистрация
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
