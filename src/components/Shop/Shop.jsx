import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item/Item.jsx";
import "./Shop.css";

class Shop extends Component {
  filterSelection = (c) => {
    let x, i;
    x = document.getElementsByClassName("itemDiv");
    if (c === "all") c = "";
    for (i = 0; i < x.length; i++) {
      if (x[i].className.indexOf(c) > -1) {
        this.removeClass(x[i], "hide");
      } else {
        this.addClass(x[i], "hide");
      }
    }
  };

  filterSelection2 = (c) => {
    document.querySelector(".shirts").style.display = "block";
    document.querySelector(".stickers").style.display = "block";
    switch (c) {
      case "shirts":
        document.querySelector(".stickers").style.display = "none";
        break;
      case "stickers":
        document.querySelector(".shirts").style.display = "none";
        break;
    }
  };

  addClass = (element, name) => {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        element.className += " " + arr2[i];
      }
    }
  };

  removeClass = (element, name) => {
    let i, arr1, arr2;
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
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <h3>Filter by</h3>
              <div>
                <h4>Categories:</h4>
                <form className="filter">
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="all"
                      value="all"
                      name="filter"
                      onClick={() => this.filterSelection2("all")}
                    ></input>
                    <label htmlFor="all">Show All</label>
                  </div>
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="shirts"
                      value="shirts"
                      name="filter"
                      onClick={() => this.filterSelection2("shirts")}
                    ></input>
                    <label htmlFor="shirts">Shirts</label>
                  </div>
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="stickers"
                      value="stickers"
                      name="filter"
                      onClick={() => this.filterSelection2("stickers")}
                    ></input>
                    <label htmlFor="stickers">Stickers</label>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-9 offset-1">
              <div className="shirts">
                <h3>Shirts</h3>
                <div className="row">
                  {Object.keys(items)
                    .filter((key) => items[key].category === "shirt")
                    .map((key) => (
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
              <div className="stickers">
                <h3>Stickers</h3>
                <div className="row">
                  {Object.keys(items)
                    .filter((key) => items[key].category === "sticker")
                    .map((key) => (
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
