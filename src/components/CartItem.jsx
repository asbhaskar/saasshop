import React, { Component } from "react";

class CartItem extends Component {
  state = {};
  render() {
    return (
      <div>
        <img style={{ width: 200 }} src={this.props.item.image} />
        <h4>{this.props.item.name}</h4>
        <button onClick={() => this.props.onDecrement(this.props.item)}>
          -
        </button>
        <span>{this.props.item.value}</span>
        <button onClick={() => this.props.onIncrement(this.props.item)}>
          +
        </button>
        <h4>${this.props.item.price}</h4>
        <button onClick={() => this.props.onDelete(this.props.item)}>X</button>
      </div>
    );
  }
}

export default CartItem;
