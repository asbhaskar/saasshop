import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Item.css";

class Item extends PureComponent {
  render() {
    const { itemId, onChange, item, quantity } = this.props;
    const { description, image_url, sales_price } = item;
    const itemQuantity = quantity ? quantity : 0;
    return (
      <div className={"itemDiv col-lg-3 col-sm-6 " + this.props.item.category}>
        <img src={image_url} alt="item"/>
        <h4>{description}</h4>
        <h5>${sales_price}</h5>
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
