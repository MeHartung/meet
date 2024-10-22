import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';

// Инициализация Atatus
atatus.config('a1e4b5335759440e9e2f447699f42701').install();

// Создание корневого элемента
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Регистрация сервис-воркера для PWA
serviceWorkerRegistration.register();  // Изменено с unregister на register

// Измерение производительности
reportWebVitals();