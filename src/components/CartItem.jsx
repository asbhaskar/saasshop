import React, { Component } from "react";
import "./CartItem.css";

class CartItem extends Component {
  state = {};
  render() {
    return (
      <div className="cartItemDiv">
        <img src={this.props.item.image} />
        <p>{this.props.item.name}</p>
        <button onClick={() => this.props.onDecrement(this.props.item)}>
          -
        </button>
        <span>{this.props.item.value}</span>
        <button onClick={() => this.props.onIncrement(this.props.item)}>
          +
        </button>
        <p>${this.props.item.price}</p>
        <button onClick={() => this.props.onDelete(this.props.item)}>X</button>
      </div>
    );
  }
}

export default CartItem;
