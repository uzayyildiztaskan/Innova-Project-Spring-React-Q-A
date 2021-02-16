import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import RegisterUserPage from '../pages/RegisterUserPage';
import LoginPage from '../pages/LoginPage';
import HomePage from'../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from '../components/TopBar';


function App() {
  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route path = "/login" component = {LoginPage} />
          <Route path = "/signup" component = {RegisterUserPage} />
          <Route path = "/user/:username" component = {UserPage} />
          <Redirect to = "/" /> 
        </Switch>
      </Router>
  </div>
  );
}

export default App;
