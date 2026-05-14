import { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isEmailInvalid = isSubmitted && !/^\S+@\S+\.\S+$/.test(email);
  const isPasswordInvalid = isSubmitted && password.trim().length === 0;
  const hasError = isEmailInvalid || isPasswordInvalid;

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const emailInvalid = !/^\S+@\S+\.\S+$/.test(email);
    const passwordInvalid = password.trim().length === 0;

    setIsSubmitted(true);

    if (emailInvalid || passwordInvalid) {
      return;
    }

    // Здесь позже будет логика входа
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo} aria-label="SkillSwap">
          <img className={styles.logoIcon} src="/logo.svg" alt="SkillSwap" />
        </a>
        <button className={styles.closeButton} type="button">
          <span>Закрыть</span>
          <span className={styles.closeIcon} aria-hidden="true">
            ×
          </span>
        </button>
      </header>

      <section className={styles.auth}>
        <h1 className={styles.title}>Вход</h1>

        <div className={styles.cards}>
          <section className={styles.formCard} aria-label="Форма входа">
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <button className={styles.socialButton} type="button">
                <img
                  className={styles.socialIcon}
                  src="/icons/google.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Продолжить с Google</span>
              </button>

              <button className={styles.socialButton} type="button">
                <img
                  className={styles.socialIcon}
                  src="/icons/apple.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Продолжить с Apple</span>
              </button>

              <div className={styles.divider}>
                <span />
                <p>или</p>
                <span />
              </div>

              <label className={styles.field}>
                <span>Email</span>
                <input
                  className={isEmailInvalid ? styles.inputError : ''}
                  type="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span>Пароль</span>

                <div className={styles.passwordWrapper}>
                  <input
                    className={isPasswordInvalid ? styles.inputError : ''}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <button
                    className={styles.eyeButton}
                    type="button"
                    aria-label={
                      showPassword ? 'Скрыть пароль' : 'Показать пароль'
                    }
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    <img
                      className={styles.eyeIcon}
                      src={
                        showPassword ? '/icons/eye-slash.svg' : '/icons/eye.svg'
                      }
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </label>

              {hasError && (
                <p className={styles.errorMessage}>
                  Email или пароль введён неверно. Пожалуйста проверьте
                  правильность введённых данных
                </p>
              )}

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Запомнить меня</span>
              </label>

              <button className={styles.submitButton} type="submit">
                Войти
              </button>

              <a className={styles.registerLink} href="/register">
                Зарегистрироваться
              </a>
            </form>
          </section>

          <aside className={styles.infoCard}>
            <img
              className={styles.bulb}
              src="/icons/light-bulb.svg"
              alt=""
              aria-hidden="true"
            />

            <div className={styles.infoText}>
              <h2>С возвращением в SkillSwap!</h2>
              <p>Обменивайтесь знаниями и навыками с другими людьми</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
