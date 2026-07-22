import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import { ErrorPage } from '../pages/error/ErrorPage';
import { Layout } from './layout/Layout';
import { initAppLoader } from './loaders/initAppLoader';
import { requireAuthLoader } from './loaders/requireAuthLoader';
import { requireGuestLoader } from './loaders/requireGuestLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    loader: initAppLoader,
    HydrateFallback: () => <div>Загрузка...</div>,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <HomePage/> },
          {
            path: 'skill/:id',
            lazy: async () => ({
              Component: (await import('../pages/skill/SkillPage')).default
            })
          },
          {
            element: <Outlet />,
            loader: requireAuthLoader,
            children: [
              {
                path: 'profile',
                lazy: async () => ({
                  Component: (await import('../pages/profile/ProfilePage')).default
                })
              },
              {
                path: 'favorites',
                lazy: async () => ({
                  Component: (await import('../pages/favorites/FavoritesPage')).default
                })
              },
              {
                path: 'create',
                lazy: async () => ({
                  Component: (await import('../pages/create/CreateSkillPage')).default
                })
              },
            ]
          },
          { path: '*', element: <ErrorPage code={404} /> }
        ]
      },
      {
        element: <Outlet/>,
        loader: requireGuestLoader,
        children: [
          {
            path: 'login',
            lazy: async () => ({
              Component: (await import('../pages/login/LoginPage')).default
            })
          },
          {
            path: 'register',
            lazy: async () => ({
              Component: (await import('../pages/register/RegisterPage')).RegisterPage
            })
          }
        ]
      }
    ],
  }
],
{
  basename: import.meta.env.BASE_URL,
}
);
