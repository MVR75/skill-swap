import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './app/router';
import './app/globals.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './shared/context/ThemeContext'; // 👈 Добавь импорт

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider> {/* 👈 Добавь обертку ThemeProvider */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);