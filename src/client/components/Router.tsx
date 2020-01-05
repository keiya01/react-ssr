import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";

const Router = () => {
  return (
    <Switch>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  );
};

export default Router;
