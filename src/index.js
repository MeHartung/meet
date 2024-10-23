import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';

// Инициализация Atatus с новой конфигурацией
atatus.config('f56d5a98e2bb436ab7288c275143f858').install();

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
