import React, { Component } from "react";
import PropTypes from "prop-types";
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
        <button onClick={() => onChange(itemId, -1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onChange(itemId, 1)}>+</button>
        <span>${sales_price} ea.</span>
      </div>
    );
  }
}

CartItem.propTypes = {
  itemId: PropTypes.string,
  onChange: PropTypes.func,
  item: PropTypes.shape({
    description: PropTypes.string,
    image_url: PropTypes.string,
    sales_price: PropTypes.number,
  }),
  quantity: PropTypes.number,
};

export default CartItem;
