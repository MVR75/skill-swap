import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import SkillPage from '../pages/skill/SkillPage';
import ProfilePage from '../pages/profile/ProfilePage';
import FavoritesPage from '../pages/favorites/FavoritesPage';
import LoginPage from '../pages/login/LoginPage';
import CreateSkillPage from '../pages/create/CreateSkillPage';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import { RegisterPage } from '../pages/register/RegisterPage';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/skill/:id" element={<SkillPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/register"
        element={<RegisterPage onClose={() => console.log('close')} />}
      />
      <Route path="/create" element={<CreateSkillPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
