import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap-override.scss';
import App from './App';
import RegisterUserPage from './pages/RegisterUserPage';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
