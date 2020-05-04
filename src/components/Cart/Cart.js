import React, { Component } from "react";
import CartItem from "./CartItem/CartItem";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.css";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

class Cart extends Component {
  state = {};

  CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
        width: "100%",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  calculateTotal = () => {
    var total = 0;
    for (var i = 0; i < this.props.items.length; i++) {
      total = total + this.props.items[i].price * this.props.items[i].value;
    }
    return total;
  };

  renderItems = () => {
    if (this.props.items.length == 0) {
      return <p>Your cart is empty!</p>;
    } else {
      return this.props.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrement={this.props.onIncrement}
          onDecrement={this.props.onDecrement}
          onDelete={this.props.onDelete}
        />
      ));
    }
  };

  onSubmit = () => {
    alert("Pressed submit button");
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment("{CLIENT_SECRET}", {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Rachel Li",
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g. insufficient funds)
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        {console.log(this.props)}
        <h1>Your Shopping Cart</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">{this.renderItems()}</div>
            <div className="col-lg-5 offset-lg-1">
              <p style={{ textAlign: "right" }}>
                <strong>SUBTOTAL</strong> ${this.calculateTotal()}
              </p>
              <form onSubmit={this.handleSubmit}>
                <label for="name">Name</label>
                <input type="text" id="name" name="name"></input>
                <br></br>
                <label for="email">Email</label>
                <input type="text" id="email" name="email"></input>
                <br></br>
                <div className="paymentMethod">
                  <label for="payment">Payment Method</label>
                  <input
                    type="radio"
                    id="venmo"
                    name="payment"
                    value="venmo"
                  ></input>
                  <label for="venmo">Venmo</label>

                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                  ></input>
                  <label for="cash">Cash</label>

                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                  ></input>
                  <label for="card">Card</label>
                  <br></br>
                </div>
                <label>
                  Card details
                  <CardElement options={this.CARD_ELEMENT_OPTIONS} />
                </label>
                <button disabled={!this.props.stripe}>Confirm order</button>
                <p>
                  If you selected Venmo, please Venmo ${this.calculateTotal()}{" "}
                  to @calsaas.
                </p>
                <input
                  className="submit"
                  type="submit"
                  value="Submit"
                  onClick={this.onSubmit}
                ></input>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
