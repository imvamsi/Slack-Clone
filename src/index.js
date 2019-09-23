import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider, connect } from "react-redux";
import store from "./store";
import { setUser, clearUser } from "./actions/Actions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import firebase from "./firebase";
import Spinner from "./Spinner";
const Root = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        props.setUser(user);
        props.history.push("/");
      } else {
        props.history.push("/login");
        props.clearUser();
      }
    });
    //eslint-disable-next-line
  }, []);

  return props.loading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

const mapStateFromProps = state => ({
  loading: state.user.loading
});
const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
