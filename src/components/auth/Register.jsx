import React from "react";
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
import "../App.css";
const Register = () => {
  const onChange = () => {};
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="tags" color="orange" /> Register for DevChat Box
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="username"
              onChange={onChange}
              type="text"
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={onChange}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={onChange}
              type="password"
            />

            <Form.Input
              fluid
              name="passwordconfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Confirm Password"
              onChange={onChange}
              type="password"
            />
            <Button color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a registered user ? Please, <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
