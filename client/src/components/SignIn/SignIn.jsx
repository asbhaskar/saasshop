import React from "react";
import PropTypes from "prop-types";
import firebase from "../../firebase/firebase";
import { Redirect } from "react-router";

const provider = new firebase.auth.GoogleAuthProvider();

class SignIn extends React.Component {
  componentDidMount() {
    if (firebase.auth().currentUser == undefined) {
    }
  }

  render() {
    if (firebase.auth().currentUser) {
      alert("dog");
      return <Redirect to="/" />;
    }

    return <div>meepmeep</div>;
  }
}

export default SignIn;
