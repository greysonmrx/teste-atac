import React from 'react';
import { Switch } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/sign-up" exact component={SignUp} />

    <Route path="/dashboard" exact isPrivate component={Dashboard} />
  </Switch>
);

export default Routes;
