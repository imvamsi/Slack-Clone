import React, { useEffect, Fragment, Component } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import firebase from "./firebase";
const Root = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user);
        props.history.push("/");
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};
const RootWithAuth = withRouter(Root);
ReactDOM.render(
  <Router>
    <RootWithAuth />
  </Router>,
  document.getElementById("root")
);
