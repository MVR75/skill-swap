import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './app/router';
import './app/globals.css';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
