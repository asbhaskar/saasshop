import React, { PureComponent } from "react";
import "./UserItem.css";
import PurchasedItem from "./PurchasedItem.jsx";

class UserItem extends PureComponent {
  render() {
    const { all_items, order } = this.props;
    const { date, items, payment_method, total } = order;
    const convertedDate = new Date(date * 1000);
    return (
      <div className="col-lg-4 col-md-6">
        <div className="userItemDiv">
          <strong>Date: </strong> {convertedDate.getMonth() + 1}/
          {convertedDate.getUTCDate()}
          <span>
            <strong>Payment Method: </strong> {payment_method}
          </span>
          <span>
            <strong>Order Total: </strong> ${total}
          </span>
          {Object.keys(items).map((key) => (
            <PurchasedItem
              key={key}
              itemId={key}
              quantity={items[key]}
              item_info={all_items[key]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default UserItem;
