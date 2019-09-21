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
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordconfirmation: "",
    errors: [],
    loading: false
  });
  const {
    username,
    email,
    password,
    passwordconfirmation,
    errors,
    loading
  } = user;
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const isFormvalid = () => {
    let errors = [];
    let error;
    if (isFormEmpty(user)) {
      error = {
        message: "please fill in all fields"
      };
      setUser({
        ...user,
        errors: errors.concat(error)
      });
      return false;
    } else if (!isPasswordValid(user)) {
      error = { message: "password is not valid" };
      setUser({
        ...user,
        errors: errors.concat(error)
      });
      return false;
    } else {
      return true;
    }
  };

  const isPasswordValid = ({ password, passwordconfirmation }) => {
    if (password.length < 6 || passwordconfirmation.length < 6) {
      return false;
    } else if (password !== passwordconfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = ({ username, email, password, passwordconfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordconfirmation.length
    );
  };

  const displayErrors = errors => {
    //console.log(errors);
    return errors.map(function(error, i) {
      //console.log(error);
      return <p key={i}>{error.message}</p>;
    });
    //console.log(error);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isFormvalid()) {
      setUser({
        ...user,
        loading: true
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          console.log(res);
          setUser({
            ...user,
            loading: false,
            errors: []
          });
        })
        .catch(err => {
          console.log(err);
          setUser({
            ...user,
            errors: errors.concat(err),
            loading: false
          });
        });
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
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="tags" color="orange" /> Register for DevChat Box
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="username"
              onChange={onChange}
              type="text"
              value={username}
              className={handleInputError(errors, "username")}
            />

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

            <Form.Input
              fluid
              name="passwordconfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Confirm Password"
              onChange={onChange}
              type="password"
              value={passwordconfirmation}
              className={handleInputError(errors, "passwordconfirmation")}
            />
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="orange"
              fluid
              size="large"
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
        <Message>
          Already a registered user ? Please, <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
