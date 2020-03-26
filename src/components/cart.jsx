import React, { Component } from "react";
import CartItem from "./CartItem";
import "./cart.css";

class Cart extends Component {
  state = {};

  calculateTotal = () => {
    var total = 0;
    for (var i = 0; i < this.props.items.length; i++) {
      total = total + this.props.items[i].price * this.props.items[i].value;
    }
    return total;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Your Shopping Cart</h1>
        <div className="cartContainer">
          <div className="cartSummary">
            {this.props.items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={this.props.onIncrement}
                onDecrement={this.props.onDecrement}
                onDelete={this.props.onDelete}
              />
            ))}
          </div>
          <div className="paymentBox">
            <p style={{ textAlign: "right" }}>
              <strong>SUBTOTAL</strong> ${this.calculateTotal()}
            </p>
            <form>
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
              <label for="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber"></input>
              <br></br>
              <label for="cardName">Name on Card</label>
              <input type="text" id="cardName" name="cardName"></input>
              <br></br>
              <label for="expiration">Expiration Date</label>
              <input type="text" id="expiration" name="expiration"></input>
              <br></br>
              <p>
                If you selected Venmo, please Venmo ${this.calculateTotal()} to
                @calsaas.
              </p>
              <input type="submit" value="Submit"></input>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
