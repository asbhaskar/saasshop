import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Item.css";

class Item extends PureComponent {
  render() {
    const { itemId, onChange, item, quantity } = this.props;
    const { description, image_url, sales_price } = item;
    const itemQuantity = quantity ? quantity : 0;
    return (
      <div className="col-lg-4 col-sm-6 ">
        <div className={"itemDiv " + this.props.item.category}>
          <div className="itemImg">
            <img src={image_url} alt="item" />
          </div>

          <h4>{description}</h4>
          <h5>${sales_price}</h5>
          <label htmlFor="size">Size: </label>
          <select id="size">
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
            <option value="extra_large">XL</option>
          </select>
          <div>
            <button className="quantity" onClick={() => onChange(itemId, -1)}>
              -
            </button>
            <span style={{ margin: 10 }}>{itemQuantity}</span>
            <button className="quantity" onClick={() => onChange(itemId, 1)}>
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  itemId: PropTypes.string,
  onChange: PropTypes.func,
  item: PropTypes.shape({
    description: PropTypes.string,
    image_url: PropTypes.string,
    sales_price: PropTypes.number,
  }),
  quantity: PropTypes.number,
};

export default Item;
