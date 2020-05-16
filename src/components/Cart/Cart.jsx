import React, { Component } from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem/CartItem.jsx";
import CartItemSummary from "./CartItemSummary/CartItemSummary.jsx";
import "./Cart.css";
import firebase from "../../firebase/firebase";
import Gift from "../../assets/images/gift.png";
import { Button,
  FormLabel, FormControl, FormControlLabel, 
  Radio, RadioGroup, 
  TextField, 
  } from '@material-ui/core';

class Cart extends Component {
  state = {
    method: "venmo"
  };

  // Function to display items in cart before submit
  renderItems = (items, currentCart, onChange, calculateNumItems) => {
    if (calculateNumItems(currentCart, items) === 0) {
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
  renderItemsSummary = (items, currentCart, onChange, calculateNumItems) => {
    if (calculateNumItems(currentCart, items) === 0) {
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

  onChangePayment = (event, value) => {
    this.setState({method: value})
  }

  // Listen for form submit
  submitForm = (event) => {
    event.preventDefault();

    // Do not save if cart is empty
    const { items, currentCart } = this.props;
    if (this.props.calculateNumItems(currentCart, items) === 0) {
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
      .getElementById("payment-form")
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
    const {
      items,
      currentCart,
      onChange,
      calculateTotalPrice,
      calculateNumItems,
    } = this.props;
    return (
      <React.Fragment>
        <div className="container order-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="cart">
                <h2 class="center shopping-cart-label">Your Shopping Cart</h2>
                  {this.renderItems(
                    items,
                    currentCart,
                    onChange,
                    calculateNumItems
                  )}
              </div>
            </div>
            <div className="col-lg-5 offset-1">
              <form id="payment-form">
                <h2 class="center">Confirm Order</h2>
                <TextField label="Name" id="name" type="text" required />
                <br />
                <TextField label="Email" id="email" type="email" required />
                <br />
                <div class="payment-method">
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className="filter-label" required>Payment Method</FormLabel>
                    <RadioGroup aria-label="payment" name="payment" value={this.value} onChange={this.onChangePayment}>
                      <FormControlLabel value="venmo" control={<Radio />} label="Venmo" />
                      <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                      <FormControlLabel value="card" control={<Radio />} label="Card" />
                    </RadioGroup>
                  </FormControl>
                </div>

                <p>
                  If you selected Venmo, please Venmo $
                  {calculateTotalPrice(currentCart, items)} to @calsaas.
                </p>
                <p className="subtotal">
                  <strong>SUBTOTAL</strong> $
                  {calculateTotalPrice(currentCart, items)}
                </p>
                <Button variant="outlined" color="primary" className="submitButton">
                  Submit
                </Button>
                {/* <button className="submitButton" type="submit">
                  Submit
                </button> */}
                <p id="emptyCart center">
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
                {calculateTotalPrice(currentCart, items)}
              </p>
              {this.renderItemsSummary(
                items,
                currentCart,
                onChange,
                calculateNumItems
              )}
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
