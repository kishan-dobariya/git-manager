import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import Header from './components/Header';
import OwnRepo from './components/OwnRepo';
import ListRepo from './components/ListRepo';
import Auth from './components/Auth';
import './App.scss';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !!localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )
  } />
)

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/' />
  )
  } />
)

export default function AllRouter() {

  return (
    <Router>
      <div className="MainContainer">
        <Header />
        <div className="container">
          <div className="mx-auto col-lg-5 col-md-7 mt-lg-5 mt-4">
            <PrivateRoute path="/starts" component={ListRepo} exact />
            <PrivateRoute path="/repository" component={OwnRepo} exact />
            <PrivateRoute path="/" component={OwnRepo} exact />
            <LoginRoute path="/login" component={Auth} exact />
          </div>
        </div>
      </div>
    </Router>
  );
}
