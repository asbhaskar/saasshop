import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item/Item.jsx";
import "./Shop.css";

class Shop extends Component {
  filterSelection = (c) => {
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
                      onClick={() => this.filterSelection("all")}
                    ></input>
                    <label htmlFor="all">Show All</label>
                  </div>
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="shirts"
                      value="shirts"
                      name="filter"
                      onClick={() => this.filterSelection("shirts")}
                    ></input>
                    <label htmlFor="shirts">Shirts</label>
                  </div>
                  <div className="filterOption">
                    <input
                      type="radio"
                      id="stickers"
                      value="stickers"
                      name="filter"
                      onClick={() => this.filterSelection("stickers")}
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
