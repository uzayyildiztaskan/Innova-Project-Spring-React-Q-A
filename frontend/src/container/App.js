import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import RegisterUserPage from '../pages/RegisterUserPage';
import LoginPage from '../pages/LoginPage';


function App() {
  return (
    <div className = "row">
      <div className = "col">
        <RegisterUserPage />
      </div>
      <div className = "col">
        <LoginPage />
      </div>
  </div>
  );
}

export default App;
