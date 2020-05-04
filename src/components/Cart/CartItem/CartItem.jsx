import React, { Component } from "react";
import "./CartItem.css";

class CartItem extends Component {
  state = {};

  render() {
    const { itemId, onChange, item, quantity } = this.props;
    const { description, image_url, sales_price } = item;
    if (!quantity || quantity == 0) {
      return null;
    }
    return (
      <div className="cartItemDiv">
        <img src={image_url} />
        <span>{description}</span>
        <button onClick={() => this.props.onChange(itemId, -1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => this.props.onChange(itemId, 1)}>+</button>
        <span>${sales_price} ea.</span>
      </div>
    );
  }
}

export default CartItem;
