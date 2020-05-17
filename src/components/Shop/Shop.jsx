import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Item from "./Item/Item.jsx";
import "./Shop.css";
import { HashLink as Link } from "react-router-hash-link";

import {
  Button,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

class Shop extends Component {
  // Function to filter by category (shirt, sticker)
  filterSelection = (c, value) => {
    document.querySelector(".shirts").style.display = "block";
    document.querySelector(".stickers").style.display = "block";
    switch (value) {
      case "shirts":
        document.querySelector(".stickers").style.display = "none";
        break;
      case "stickers":
        document.querySelector(".shirts").style.display = "none";
        break;
      default:
        break;
    }
  };

  // Function that renders "Edit inventory" button if admin
  renderAdminFunction = () => {
    if (this.props.auth) {
      const email = this.props.auth.email;
      //console.log(this.props.adminEmailList, email);
      if (this.props.adminEmailList.includes(email)) {
        return (
          <Link className="inventoryLink" to="/admin">
            Edit Inventory
          </Link>
        );
      }
      return null;
    }
    return null;
  };

  render() {
    const { items, currentCart } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div>{this.renderAdminFunction()}</div>

              <FormControl className="filterForm" component="fieldset">
                <FormLabel component="legend">Filter By Category</FormLabel>
                <RadioGroup
                  aria-label="filter"
                  name="filter"
                  value={this.value}
                  onChange={this.filterSelection}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="shirts"
                    control={<Radio />}
                    label="Shirts"
                  />
                  <FormControlLabel
                    value="stickers"
                    control={<Radio />}
                    label="Stickers"
                  />
                </RadioGroup>
              </FormControl>
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
