import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Cart/Cart";
import "./ShopHome.css";
import Zoomer from "../assets/images/shirts/zoomer.png";
import Logo from "../assets/images/stickers/SAAS_logo.png";

class ShopHome extends Component {
  state = {
    items: [
      {
        id: 1,
        value: 0,
        name: "Ok Zoomer",
        price: 20,
        image: Zoomer,
      },
      {
        id: 2,
        value: 0,
        name: "SAAS Logo",
        price: 2,
        image: Logo,
      },
    ],
  };

  handleIncrement = (item) => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].value++;
    this.setState({ items });
  };

  handleDecrement = (item) => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    if (items[index].value > 0) {
      items[index].value--;
    }
    this.setState({ items });
  };

  handleDelete = (item) => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].value = 0;
    this.setState({ items });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar items={this.state.items.filter((i) => i.value > 0)} />
        <Route
          exact
          path="/"
          render={(props) => (
            <Shop
              {...props}
              items={this.state.items}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <Cart
              {...props}
              items={this.state.items.filter((i) => i.value > 0)}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ShopHome;
