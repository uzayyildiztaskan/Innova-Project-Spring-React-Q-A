import React from 'react';
import RegisterUserPage from '../pages/RegisterUserPage';
import LoginPage from '../pages/LoginPage';
import HomePage from'../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from '../components/TopBar';
import { connect } from 'react-redux';
// import { Authentication } from '../shared/AuthenticationContext';


class App extends React.Component{
  // static contextType = Authentication;

  render() {
    const {isLoggedIn} = this.props.isLoggedIn;

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path = "/" component = {HomePage} />
            {!isLoggedIn && (
              <Route
                path = "/login" 
                component = {LoginPage} />
            )}
            <Route path = "/signup" component = {RegisterUserPage} />
            <Route 
              path = "/user/:username" component = {UserPage}/>
            <Redirect to = "/" /> 
          </Switch>
        </Router>
    </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
      isLoggedIn: store.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
