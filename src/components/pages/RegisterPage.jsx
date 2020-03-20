import React from "react";
import { connect } from "react-redux";
import RegisterForm from "../forms/RegisterForm";
import { signup } from "../../actions/auth";
import {Segment} from  "semantic-ui-react"
class RegisterPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));
    
  render() {
    return (
      <Segment className="ui container  ">
        <RegisterForm submit={this.submit} />
      </Segment>
    );
  }
}

export default connect(null, { signup })(RegisterPage);