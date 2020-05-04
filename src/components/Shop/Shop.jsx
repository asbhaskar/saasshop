import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item/Item.jsx";

class Shop extends Component {
  render() {
    const { items, currentCart } = this.props;
    return (
      <div class="row">
        {Object.keys(items).map((key) => (
          <Item
            key={key}
            itemId={key}
            quantity={currentCart[key]}
            item={items[key]}
            onChange={this.props.onChange}
          />
        ))}
      </div>
    );
  }
}

Item.propTypes = {
  items: PropTypes.object,
  currentCart: PropTypes.object,
};

export default Shop;
