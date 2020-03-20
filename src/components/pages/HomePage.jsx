import React from "react";
import { Segment } from "semantic-ui-react"
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

const HomePage = ({ isAuthenticated, logout }) => (
  <Segment className="ui container">
    <h2>Cloudinary Image App</h2>
    <h5>Object Recognition</h5>
  </Segment>
);



function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);

