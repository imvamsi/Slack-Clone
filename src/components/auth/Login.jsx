import React, { useState } from "react";
import {
  Grid,
  Button,
  Form,
  Segment,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import "../App.css";
import "./Login.css";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",

    errors: [],
    loading: false
  });
  const {
    email,
    password,

    errors,
    loading
  } = user;
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  //loginerror display
  const displayErrors = errors => {
    //console.log(errors);
    return errors.map(function(error, i) {
      //console.log(error);
      return <p key={i}>{error.message}</p>;
    });
    //console.log(error);
  };

  //submit process
  const onSubmit = e => {
    e.preventDefault();
    if (isFormValid(user)) {
      setUser({
        ...user,
        loading: true
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          setUser({
            ...user,
            errors: user.errors.concat(err)
          });
        });
    }
  };

  const isFormValid = ({ email, password }) => {
    if (email && password) {
      return true;
    }
  };

  const handleInputError = (errors, inputname) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputname) ? "error" : ""
    );
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon style={{ color: "#5c6ae6" }} textAlign="center">
          <Icon name="code branch" style={{ color: "#5c6ae6" }} /> Login to
          DevChat Box
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={onChange}
              type="email"
              value={email}
              className={handleInputError(errors, "email")}
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={onChange}
              type="password"
              value={password}
              className={handleInputError(errors, "password")}
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
              fluid
              //   size="large"
              id="submit-btn"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message style={{ marginRight: "15px", width: "100%" }}>
          New User ?, Please <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
