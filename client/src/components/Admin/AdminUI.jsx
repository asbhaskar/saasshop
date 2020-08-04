import React, { Component } from "react";
import "./Admin.css";
import AdminUIItem from "./AdminItem/AdminUIItem";
import { HashLink as Link } from "react-router-hash-link";

class AdminUI extends Component {
  state = {};

  render() {
    const { items, updateStock } = this.props;
    return (
      <React.Fragment>
        <h1>Inventory</h1>
        <Link className="addMerchButton" to="/addmerch">
          Add Merch
        </Link>

        <div className="adminShirts">
          <h3>Shirts</h3>
          <div className="row">
            {Object.keys(items)
              .filter((key) => items[key].category === "shirt")
              .map((key) => (
                <AdminUIItem
                  key={key}
                  itemId={key}
                  item={items[key]}
                  updateStock={updateStock}
                />
              ))}
          </div>
        </div>
        <div className="adminStickers">
          <h3>Stickers</h3>
          <div className="row">
            {Object.keys(items)
              .filter((key) => items[key].category === "sticker")
              .map((key) => (
                <AdminUIItem
                  key={key}
                  itemId={key}
                  item={items[key]}
                  updateStock={updateStock}
                />
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminUI;
