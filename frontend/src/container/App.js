import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import RegisterUserPage from '../pages/RegisterUserPage';
import LoginPage from '../pages/LoginPage';


function App() {
  return (
    <div className = "row">
      <div className = "col">
        <ApiProgress path = "/api/1.0/users">
          <RegisterUserPage />
        </ApiProgress>
      </div>
      <div className = "col">
        <ApiProgress path = "/api/1.0/auth">
          <LoginPage />
        </ApiProgress>
      </div>
  </div>
  );
}

export default App;
