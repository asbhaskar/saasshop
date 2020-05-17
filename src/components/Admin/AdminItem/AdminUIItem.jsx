import React, { PureComponent } from "react";
import { IconButton } from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

class AdminUIItem extends PureComponent {
  render() {
    const { itemId, updateStock, item } = this.props;
    const { description, image_url, sales_price, on_order, stock } = item;
    return (
      <div className="col-lg-4 col-md-6 ">
        <div className={"itemDiv " + this.props.item.category}>
          <div className="itemImg">
            <img src={image_url} alt="item" />
          </div>

          <h5>
            {description} | ${sales_price}
          </h5>
          <h5>On order: {on_order} </h5>
          <div className="quantity-control">
            <IconButton
              className="circleButton"
              aria-label="delete"
              onClick={() => updateStock(itemId, -1)}
            >
              <RemoveCircleIcon fontSize="default" />
            </IconButton>
            <span style={{ margin: 10 }}>{stock}</span>
            <IconButton
              className="circleButton"
              aria-label="delete"
              onClick={() => updateStock(itemId, 1)}
            >
              <AddCircleIcon fontSize="default" />
            </IconButton>
            {/* <button className="quantity" onClick={() => onChange(itemId, -1)}>
                -
              </button>
              <span style={{ margin: 10 }}>{itemQuantity}</span>
              <button className="quantity" onClick={() => onChange(itemId, 1)}>
                +
              </button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUIItem;
