import React, { PureComponent } from "react";
import "./PurchasedItem.css";

class PurchasedItem extends PureComponent {
  render() {
    const { quantity, item_info } = this.props;
    const { image_url, description, sales_price } = item_info;
    // problem: will not display the item if stock is 0?
    return (
      <div className="purchasedItemDiv">
        <img src={image_url} />
        <span>{description}</span>
        <span className="purchasedQuantity">{quantity}</span>
        <span>${sales_price} ea.</span>
      </div>
    );
  }
}

export default PurchasedItem;
