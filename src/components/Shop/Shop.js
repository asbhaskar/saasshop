import React, { Component } from "react";
import Item from "./Item/Item";
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

          <h3>Price:</h3>
        </div>
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
      </React.Fragment>
    );
  }
}

export default Shop;
