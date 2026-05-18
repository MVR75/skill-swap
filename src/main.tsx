import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './app/router';
import './app/globals.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { ThemeProvider } from './shared/context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
