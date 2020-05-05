import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Cart/Cart";
import "./ShopHome.css";
import firebase from "../firebase/firebase";

class ShopHome extends Component {
  state = {
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
        <NavBar
          items={this.state.data}
          onChange={this.onChange}
          currentCart={this.state.currentCart['0ol7jZ1IcRMKTvgxiigb']}
        />
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
              currentCart={this.state.currentCart}
              onChange={this.onChange}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ShopHome;
