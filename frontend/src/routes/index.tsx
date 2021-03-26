import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/sign-up" exact component={SignUp} />
  </Switch>
);

export default Routes;
