import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Cart/Cart";
import "./ShopHome.css";
import Zoomer from "../assets/images/shirts/zoomer.png";
import Logo from "../assets/images/stickers/SAAS_logo.png";
import firebase from "../firebase/firebase";

class ShopHome extends Component {
  state = {
    items: [
      {
        id: 1,
        value: 0,
        name: "DOGDOGDOG",
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
    data: {},
    currentCart: {},
  };

  componentDidMount() {
    this.pullShopItems();
  }

  pullShopItems = () => {
    firebase
      .firestore()
      .collection("inventory")
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          const data = this.state.data;
          data[item.id] = item.data();
          this.setState({ data });
        });
      });
  };

  onChange = (itemId, direction) => {
    const cart = this.state.currentCart;
    const currentCart = cart[itemId] ? cart[itemId] : 0;
    const stock = this.state.data[itemId].stock;
    let updatedCount =
      currentCart + direction < 0 ? 0 : currentCart + direction;
    if (updatedCount > stock) {
      updatedCount = stock;
      alert("Cannot add item to cart. Max stock of item reached.");
    }
    //updatedCount = updatedCount > stock ? stock : updatedCount;
    cart[itemId] = updatedCount;
    this.setState({ cart });
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
          render={() => (
            <Shop
              items={this.state.data}
              onChange={this.onChange}
              currentCart={this.state.currentCart}
            />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <Cart
              {...props}
              items={this.state.data}
              //items={this.state.items.filter((i) => i.value > 0)}
              //onIncrement={this.handleIncrement}
              //onDecrement={this.handleDecrement}
              currentCart={this.state.currentCart}
              onChange={this.onChange}
              // onDelete={this.handleDelete}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ShopHome;
