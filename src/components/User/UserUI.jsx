import React, { Component } from "react";
import "./User.css";
import UserItem from "./UserItem/UserItem.jsx";

class UserUI extends Component {
  state = {};

  render() {
    const { orders, items } = this.props;
    return (
      <React.Fragment>
        <h1>Past Orders</h1>
        <div class="container">
          <div class="row">
            {Object.keys(orders).map((key) => (
              <UserItem
                key={key}
                orderId={key}
                order={orders[key]}
                all_items={items}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserUI;
