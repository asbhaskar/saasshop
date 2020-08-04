import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CartItem.css";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

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
        <div className="quantity-control">
          <IconButton
            className="circleButton"
            aria-label="delete"
            onClick={() => onChange(itemId, -1)}
          >
            <RemoveCircleIcon fontSize="default" />
          </IconButton>
          <span style={{ margin: 10 }}>{quantity}</span>
          <IconButton
            className="circleButton"
            aria-label="delete"
            onClick={() => onChange(itemId, 1)}
          >
            <AddCircleIcon fontSize="default" />
          </IconButton>
        </div>
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
