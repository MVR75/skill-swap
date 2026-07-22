import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../app/store';
import {
  setUserInfo,
  selectIsAuthenticated,
  type UserInfo,
} from '../../features/Users/userSlice';
import { saveUserToStorage } from '../shared/lib/userStorage';
import styles from './LoginPage.module.css';

type MockUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  skills: string[];
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Куда возвращаться после логина: state.from или предыдущая страница
  const from = (location.state as { from?: string } | null)?.from || -1;

  // Если уже залогинен — сразу редирект
  useEffect(() => {
    if (isAuthenticated) {
      if (typeof from === 'string') {
        navigate(from, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, navigate, from]);

  const isEmailInvalid = isSubmitted && !/^\S+@\S+\.\S+$/.test(email);
  const isPasswordInvalid = isSubmitted && password.trim().length === 0;
  const hasError = isEmailInvalid || isPasswordInvalid || loginError;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setLoginError(false);

    const emailInvalid = !/^\S+@\S+\.\S+$/.test(email);
    const passwordInvalid = password.trim().length === 0;

    if (emailInvalid || passwordInvalid) {
      return;
    }

    // Ищем юзера в моках по email
    try {
      const response = await fetch('/db/users.json');
      const users: MockUser[] = await response.json();
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!foundUser) {
        setLoginError(true);
        return;
      }

      // Мапим мок-юзера в UserInfo
      const userInfo: UserInfo = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        birthDate: null,
        gender: 'male',
        city: '',
        about: '',
      };

      // Сохраняем в стор + localStorage
      dispatch(setUserInfo(userInfo));
      saveUserToStorage(userInfo);

      // Редирект назад или на главную
      if (typeof from === 'string') {
        navigate(from, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setLoginError(true);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo} aria-label="SkillSwap">
          <img className={styles.logoIcon} src={`${import.meta.env.BASE_URL}logo.svg`} alt="SkillSwap" />
        </Link>
        <button
          className={styles.closeButton}
          type="button"
          onClick={handleClose}
        >
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
                  src={`${import.meta.env.BASE_URL}icons/google.svg`}
                  alt=""
                  aria-hidden="true"
                />
                <span>Продолжить с Google</span>
              </button>

              <button className={styles.socialButton} type="button">
                <img
                  className={styles.socialIcon}
                  src={`${import.meta.env.BASE_URL}icons/apple.svg`}
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
                  className={
                    isEmailInvalid || loginError ? styles.inputError : ''
                  }
                  type="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setLoginError(false);
                  }}
                />
              </label>

              <label className={styles.field}>
                <span>Пароль</span>

                <div className={styles.passwordWrapper}>
                  <input
                    className={
                      isPasswordInvalid || loginError ? styles.inputError : ''
                    }
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setLoginError(false);
                    }}
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
                        showPassword ? `${import.meta.env.BASE_URL}icons/eye-slash.svg` : `${import.meta.env.BASE_URL}icons/eye.svg`
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

              <button
                className={styles.registerLink}
                type="button"
                onClick={handleRegister}
              >
                Зарегистрироваться
              </button>
            </form>
          </section>

          <aside className={styles.infoCard}>
            <img
              className={styles.bulb}
              src={`${import.meta.env.BASE_URL}icons/light-bulb.svg`}
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
