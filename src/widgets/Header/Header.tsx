import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Button } from '../../shared/ui/button/Button';
import { NotificationsDropdown } from '../NotificationsDropdown/NotificationsDropdown';

export interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
  showSearch?: boolean;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoutClick?: () => void;

  onFavoritesClick?: () => void;
  onProfileClick?: () => void;
  onSkillsClick?: () => void;
}

export function Header({
  isAuthenticated = true,
  userName = 'User',
  userAvatar,
  showSearch = true,
  onLoginClick,
  onRegisterClick,
  onFavoritesClick,
  onProfileClick,
  onSkillsClick,
}: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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
        <button type="button" className={styles.navLink}>
          О проекте
        </button>
        <button
          type="button"
          className={styles.skillsButton}
          onClick={onSkillsClick}
        >
          Все навыки
          <img
            src="/icons/vector.svg"
            alt=""
            className={styles.chevronIcon}
            aria-hidden="true"
          />
        </button>
      </nav>

      {showSearch && (
        <label htmlFor="header-search" className={styles.search}>
          <img
            src="/icons/search.svg"
            alt=""
            className={styles.searchIcon}
            aria-hidden="true"
          />
          <input
            id="header-search"
            className={styles.searchInput}
            type="text"
            placeholder="Искать навык"
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClearSearch}
              className={styles.clearSearchBtn}
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}
        </label>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Переключить тему"
        >
          <img
            src="/icons/moon.svg"
            alt=""
            className={styles.themeIcon}
            aria-hidden="true"
          />
        </button>

        {isAuthenticated ? (
          <>
            <div className={styles.notificationsWrapper}>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Открыть уведомления"
                aria-expanded={isNotificationsOpen}
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
              >
                <img
                  src="/icons/notification.svg"
                  alt=""
                  className={styles.actionIcon}
                  aria-hidden="true"
                />
              </button>

              <div className={styles.notificationsDropdown}>
                <NotificationsDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>
            </div>

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Открыть избранное"
              onClick={onFavoritesClick}
            >
              <img
                src="/icons/like.svg"
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
                  src="/icons/user-circle.svg"
                  alt=""
                  className={styles.avatar}
                  aria-hidden="true"
                />
              )}
            </button>
          </>
        ) : (
          <div className={styles.authButtons}>
            <Button
              variant="outline"
              onClick={onLoginClick}
              className={styles.loginButton}
            >
              Войти
            </Button>
            <Button
              variant="primary"
              onClick={onRegisterClick}
              className={styles.registerButton}
            >
              Регистрация
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}