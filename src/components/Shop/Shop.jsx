import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item/Item.jsx";
import "./Shop.css";

class Shop extends Component {
  filterSelection = (c) => {
    var x, i;
    x = document.getElementsByClassName("itemDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      this.removeClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) this.addClass(x[i], "show");
    }
  };

  addClass = (element, name) => {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  };

  removeClass = (element, name) => {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
      element.className = arr1.join(" ");
    }
  };

  render() {
    const { items, currentCart } = this.props;
    return (
      <React.Fragment>
        <div class="sidebar">
          <h2>Filter by</h2>
          <div>
            <h3>Categories:</h3>
            <button
              class="btn active"
              onClick={() => this.filterSelection("all")}
            >
              Show All
            </button>
            <button class="btn" onClick={() => this.filterSelection("shirt")}>
              Shirts
            </button>
            <button class="btn" onClick={() => this.filterSelection("sticker")}>
              Stickers
            </button>
          </div>
        </div>
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
      </React.Fragment>
    );
  }
}

Item.propTypes = {
  items: PropTypes.object,
  currentCart: PropTypes.object,
};

export default Shop;
