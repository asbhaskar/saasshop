import React, { Component } from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem/CartItem.jsx";
import CartItemSummary from "./CartItemSummary/CartItemSummary.jsx";
import "./Cart.css";
import firebase from "../../firebase/firebase";
import Gift from "../../assets/images/gift.png";

class Cart extends Component {
  state = {};

  // Function to calculate the number of items in cart
  calculateNumItems = (currentCart, items) => {
    console.log(currentCart);
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

  // Function to display the items in cart
  renderItems = (items, currentCart, onChange) => {
    if (this.calculateNumItems(currentCart, items) === 0) {
      return <p>Your cart is empty!</p>;
    } else {
      return Object.keys(items).map((key) => (
        <CartItem
          key={key}
          itemId={key}
          quantity={currentCart[key]}
          item={items[key]}
          onChange={onChange}
        />
      ));
    }
  };

  renderItemsSummary = (items, currentCart, onChange) => {
    if (this.calculateNumItems(currentCart, items) === 0) {
      return <p>Your cart is empty!</p>;
    } else {
      return Object.keys(items).map((key) => (
        <CartItemSummary
          key={key}
          itemId={key}
          quantity={currentCart[key]}
          item={items[key]}
          onChange={onChange}
        />
      ));
    }
  };

  // Listen for form submit
  submitForm = (event) => {
    event.preventDefault();
    // Get values
    //TODO: figure out how to get the selected radio button
    //TODO: don't save if cart is empty??
    let name = this.getInputVal("name");
    let email = this.getInputVal("email");
    let venmo = this.getInputVal("venmo");
    let card = this.getInputVal("card");
    const { items, currentCart } = this.props;

    this.saveOrder(name, email, items, currentCart);
    this.showAlert();
  };

  // Function to get form values
  getInputVal = (id) => {
    return document.getElementById(id).value;
  };

  componentDidMount = () => {
    document
      .getElementById("paymentForm")
      .addEventListener("submit", this.submitForm);
    // Reference orders collection
    const ordersRef = firebase.firestore().collection("orders");
    this.setState({ ordersRef });
  };

  // Save order to firebase
  saveOrder = (name, email, items, currentCart) => {
    // TODO: figure out how to work with radio buttons
    // TODO: add date of order
    this.state.ordersRef.add({
      name: name,
      email: email,
      items: currentCart,
      total: this.calculateTotalPrice(currentCart, items),
    });
  };

  // Show alert
  showAlert = () => {
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".container").style.display = "none";
    //TODO: change background color to white
    document.querySelector("body").style.backgroundColor = "white";
  };

  render() {
    const { items, currentCart, onChange } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <h1>Your Shopping Cart</h1>
          <div className="row">
            <div className="col-lg-6">
              {this.renderItems(items, currentCart, onChange)}
            </div>
            <div className="col-lg-5 offset-1">
              <p style={{ textAlign: "right" }}>
                <strong>SUBTOTAL</strong> $
                {this.calculateTotalPrice(currentCart, items)}
              </p>
              <form id="paymentForm">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name"></input>
                <br></br>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"></input>
                <br></br>
                <div className="paymentMethod">
                  <label htmlFor="payment">Payment Method</label>
                  <input
                    type="radio"
                    id="venmo"
                    name="payment"
                    value="venmo"
                  ></input>
                  <label htmlFor="venmo">Venmo</label>

                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                  ></input>
                  <label htmlFor="card">Card</label>
                  <br></br>
                </div>

                <p>
                  If you selected Venmo, please Venmo $
                  {this.calculateTotalPrice(currentCart, items)} to @calsaas.
                </p>
                <button className="submitButton" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="alert container">
          <div className="row">
            <div className="col-lg-6">
              <h1>Your Order Summary</h1>
              <p style={{ textAlign: "right" }}>
                <strong>SUBTOTAL</strong> $
                {this.calculateTotalPrice(currentCart, items)}
              </p>
              {this.renderItemsSummary(items, currentCart, onChange)}
            </div>
            <div className="col-lg-5 offset-1">
              <h1> Thank you! </h1>
              <p>
                Your order has been received! We will send you a confirmation
                email, and you will receive another email when your order is
                ready for pickup. Thank you for shopping with us!
              </p>
              <img src={Gift} alt="gift" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Cart.propTypes = {
  items: PropTypes.object,
  currentCart: PropTypes.object,
  onChange: PropTypes.func,
};

export default Cart;
