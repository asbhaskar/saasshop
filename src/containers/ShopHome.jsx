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

  // Function to update the quantity of an item in cart
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
    cart[itemId] = updatedCount;
    this.setState({ cart });
  };

  // Function to calculate the total number of items in cart
  calculateNumItems = (currentCart, items) => {
    let total = 0;

    Object.keys(items).forEach((key) => {
      total += currentCart[key] ? currentCart[key] : 0;
    });

    return total;
  };

  // Function to calculate total price of items in cart
  calculateTotalPrice = (currentCart, items) => {
    let total = 0;

    Object.keys(items).forEach((key) => {
      total +=
        items[key].sales_price * (currentCart[key] ? currentCart[key] : 0);
    });

    return total.toFixed(2);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          items={this.state.data}
          onChange={this.onChange}
          currentCart={this.state.currentCart}
          calculateTotalPrice={this.calculateTotalPrice}
          calculateNumItems={this.calculateNumItems}
        />
        <div className="gradient-divide"></div>
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
              calculateTotalPrice={this.calculateTotalPrice}
              calculateNumItems={this.calculateNumItems}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ShopHome;
