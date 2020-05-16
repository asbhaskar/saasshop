import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item/Item.jsx";
import "./Shop.css";
import { FormLabel, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

class Shop extends Component {
  filterSelection = (c, value) => {
    console.log(c);
    console.log(value);
    document.querySelector(".shirts").style.display = "block";
    document.querySelector(".stickers").style.display = "block";
    switch (value) {
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
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={this.value} onChange={this.filterSelection}>
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="shirts" control={<Radio />} label="Shirts" />
                    <FormControlLabel value="stickers" control={<Radio />} label="Stickers" />
                  </RadioGroup>
                </FormControl>
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
