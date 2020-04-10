import React, { Component } from "react";
import Item from "./Item/Item";

class Shop extends Component {
  render() {
    return (
      <div class="row">
        {this.props.items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
          />
        ))}
      </div>
    );
  }
}

export default Shop;
