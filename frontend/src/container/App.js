import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import RegisterUserPage from '../pages/RegisterUserPage';
import LoginPage from '../pages/LoginPage';
import HomePage from'../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <HashRouter>
      <Switch>
        <Route exact path = "/" component = {HomePage} />
        <Route path = "/login" component = {LoginPage} />
        <Route path = "/signup" component = {RegisterUserPage} />
        <Route path = "/user/:username" component = {UserPage} />
        <Redirect to = "/" /> 
      </Switch>
      </HashRouter>
  </div>
  );
}

export default App;
