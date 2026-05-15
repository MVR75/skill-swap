import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import SkillPage from '../pages/skill/SkillPage';
import ProfilePage from '../pages/profile/ProfilePage';
import FavoritesPage from '../pages/favorites/FavoritesPage';
import LoginPage from '../pages/login/LoginPage';
import CreateSkillPage from '../pages/create/CreateSkillPage';
import { ErrorPage } from '../pages/error/ErrorPage';
import { RegisterPage } from '../pages/register/RegisterPage';
import { Layout } from './layout/Layout';
import { useEffect } from 'react';
import { useDispatch } from './store';
import { getSkills } from '../features/skills/skillsSlice';
import { getCategories } from '../features/categories/categoriesSlice';

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkills());
    dispatch(getCategories());
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/skill/:id" element={<SkillPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/create" element={<CreateSkillPage />} />
          <Route path="*" element={<ErrorPage code={404} />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
