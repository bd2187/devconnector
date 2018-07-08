import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from "./common/PrivateRoute";

const routes = (
  <Switch>
    <Route exact path="/" component={Landing} />
    <div className="container">
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </div>
  </Switch>
);

export default routes;
