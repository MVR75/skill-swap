import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { CategoriesModal } from '../../shared/ui/CategoriesModal/CategoriesModal';
import { useSelector } from '../store';
import { selectIsAuthenticated, selectUserInfo } from '../../features/Users/userSlice';
import styles from './Layout.module.css';

export function Layout() {
  const navigate = useNavigate();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className={styles.layout}>
      <Header
        isAuthenticated={isAuthenticated}
        userName={userInfo?.name || 'User'}
        userAvatar={userInfo?.src}
        onLoginClick={() => navigate('/login')}
        onRegisterClick={() => navigate('/register')}
        onProfileClick={() => navigate('/profile')}
        onSkillsClick={() => setIsCategoriesOpen(true)}
        onFavoritesClick={() => navigate('/favorites')}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />

      <CategoriesModal
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
      />
    </div>
  );
}