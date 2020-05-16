import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CartItemSummary.css";

class CartItem extends Component {
  state = {};

  render() {
    const { itemId, onChange, item, quantity } = this.props;
    const { description, image_url, sales_price } = item;
    if (!quantity || quantity === 0) {
      return null;
    }
    return (
      <div className="cartItemDiv">
        <img src={image_url} alt="cart" />
        <span>{description}</span>
        <span>{quantity}</span>
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
