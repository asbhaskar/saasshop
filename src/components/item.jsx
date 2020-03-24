import React, { Component } from "react";

class Item extends Component {
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <img src={this.props.item.image} />
        <h4>{this.props.item.name}</h4>
        <h4>${this.props.item.price}</h4>
        <button onClick={() => this.props.onDecrement(this.props.item)}>
          -
        </button>
        <span>{this.props.item.value}</span>
        <button onClick={() => this.props.onIncrement(this.props.item)}>
          +
        </button>
      </div>
    );
  }
}

export default Item;
