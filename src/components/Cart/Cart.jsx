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

  // Function to display items in cart before submit
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

  // Function to display items in cart after submit
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

    // Do not save if cart is empty
    const { items, currentCart } = this.props;
    if (this.calculateNumItems(currentCart, items) === 0) {
      document.querySelector("#emptyCart").style.display = "block";
      setTimeout(() => {
        document.querySelector("#emptyCart").style.display = "none";
      }, 3000);
      return;
    }

    // Get form values
    let name = this.getInputVal("name");
    let email = this.getInputVal("email");
    let venmo = document.getElementById("venmo").checked;
    let payment = venmo ? "venmo" : "card";

    // Save order and show summary
    this.saveOrder(name, email, payment, items, currentCart);
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
  saveOrder = (name, email, payment, items, currentCart) => {
    this.state.ordersRef.add({
      name: name,
      email: email,
      date: new Date(),
      payment_method: payment,
      items: currentCart,
      total: this.calculateTotalPrice(currentCart, items),
    });
    //TODO: update on_order in inventory?
  };

  // Show thank you + order summary page after submit
  showAlert = () => {
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".container").style.display = "none";
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
                <input type="text" id="name" name="name" required></input>
                <br></br>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required></input>
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
                <p id="emptyCart">
                  Your cart is empty! Please add some items to your cart before
                  submitting.
                </p>
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
              <h1 style={{ color: "#ADDEFF" }}>Thank you!</h1>
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
