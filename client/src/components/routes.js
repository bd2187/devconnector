import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import CreateProfile from "./create-profile/CreateProfile";
import EditProfile from "./edit-profile/EditProfile";
import AddExperience from "./add-credentials/AddExperience";
import PrivateRoute from "./common/PrivateRoute";

const routes = (
  <Switch>
    <Route exact path="/" component={Landing} />
    <div className="container">
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create-profile" component={CreateProfile} />
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        <PrivateRoute path="/add-experience" component={AddExperience} />
      </Switch>
    </div>
  </Switch>
);

export default routes;
