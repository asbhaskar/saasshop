import React, { Component } from "react";
import "./User.css";
import UserItem from "./UserItem/UserItem.jsx";

class UserUI extends Component {
  state = {};

  renderOrders = () => {
    const { orders, items, auth } = this.props;
    if (
      Object.keys(orders).filter(
        (key) => orders[key].user_id === this.props.auth.uid
      ).length === 0
    ) {
      return <div>You have no orders!</div>;
    } else {
      return Object.keys(orders)
        .filter((key) => orders[key].user_id === this.props.auth.uid)
        .map((key) => (
          <UserItem
            key={key}
            orderId={key}
            order={orders[key]}
            all_items={items}
            auth={auth}
          />
        ));
    }
  };

  render() {
    const { orders, items, auth } = this.props;
    console.log(
      Object.keys(orders).filter(
        (key) => orders[key].user_id === this.props.auth.uid
      ).length
    );
    return (
      <React.Fragment>
        <h1>Past Orders</h1>
        <div class="container">
          <div class="row">{this.renderOrders()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserUI;
