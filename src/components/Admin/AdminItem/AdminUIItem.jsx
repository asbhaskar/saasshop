import React, { PureComponent } from "react";

class AdminUIItem extends PureComponent {
  render() {
    const { itemId, updateStock, item } = this.props;
    const { description, image_url, sales_price, on_order, stock } = item;
    return (
      <div className="col-lg-4 col-sm-6 ">
        <div className={"itemDiv " + this.props.item.category}>
          <div className="itemImg">
            <img src={image_url} alt="item" />
          </div>

          <h5>
            {description} | ${sales_price}
          </h5>
          <h5>On order: {on_order} </h5>
          <div>
            <button
              className="quantity"
              onClick={() => updateStock(itemId, -1)}
            >
              -
            </button>
            <span style={{ margin: 10 }}>{stock}</span>
            <button className="quantity" onClick={() => updateStock(itemId, 1)}>
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUIItem;
