import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { CategoriesModal } from '../../shared/ui/CategoriesModal/CategoriesModal';
import styles from './Layout.module.css';

export function Layout() {
  const navigate = useNavigate();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const isAuthenticated = false;
  return (
    <div className={styles.layout}>
      <Header
        isAuthenticated={isAuthenticated}
        onLoginClick={() => navigate('/login')}
        onRegisterClick={() => navigate('/register')}
        onProfileClick={() => navigate('/profile')}
        onSkillsClick={() => setIsCategoriesOpen(true)}
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
