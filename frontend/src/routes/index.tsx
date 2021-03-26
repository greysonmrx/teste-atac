import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={() => <h1>Hello World</h1>} />
  </Switch>
);

export default Routes;
