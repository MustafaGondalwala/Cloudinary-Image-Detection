import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import thunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment className="ui container">

        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot Password?</Link>
      </Segment>
    );
  }
}

export default connect(null, { login })(LoginPage);