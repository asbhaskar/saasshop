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
      if (x[i].className.indexOf(c) > -1) {
        this.removeClass(x[i], "hide");
      } else {
        this.addClass(x[i], "hide");
      }
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
        <div class="container">
          <div class="row">
            <div class="col-lg-2">
              <h3>Filter by</h3>
              <div>
                <h4>Categories:</h4>
                <form className="filter">
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="all"
                      name="category"
                      value="all"
                      onClick={() => this.filterSelection("all")}
                    ></input>
                    <label for="all">Show All</label>
                  </div>
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="shirts"
                      name="payment"
                      value="shirts"
                      onClick={() => this.filterSelection("shirt")}
                    ></input>
                    <label for="stickers">Shirts</label>
                  </div>
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="stickers"
                      name="payment"
                      value="stickers"
                      onClick={() => this.filterSelection("sticker")}
                    ></input>
                    <label for="stickers">Stickers</label>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-9 offset-1">
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
            </div>
          </div>
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
