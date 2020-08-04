import React, { Component } from "react";
import { render } from "@testing-library/react";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>meepmeep</div>;
  }
}

export default Store;
