import React, { Component } from "react";
import Item from "./item";
import "./AdminInventory.css";

class AdminInventory extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Inventory Preview</h1>
        <div class="row but">
          <input className="button" type="submit" value="Add Merch"></input>
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

export default AdminInventory;
