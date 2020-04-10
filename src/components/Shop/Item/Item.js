import React, { Component } from "react";
import "./Item.css";

class Item extends Component {
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="itemDiv col-lg-3 col-sm-6">
        <img src={this.props.item.image} />
        <h4>{this.props.item.name}</h4>
        <h5>${this.props.item.price}</h5>
        <div>
          <button
            className="quantity"
            onClick={() => this.props.onDecrement(this.props.item)}
          >
            -
          </button>
          <span style={{ marginRight: 10 }}>{this.props.item.value}</span>
          <button
            className="quantity"
            onClick={() => this.props.onIncrement(this.props.item)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
