import React, { Component } from "react";
import Logo from "../assets/images/logo.png";
import CartIcon from "../assets/icons/supermarket.svg";
import UserIcon from "../assets/icons/user.svg";
import "./navbar.css";

class NavBar extends Component {
  sumArray = (items, prop) => {
    if (items == null) {
      return 0;
    }
    return items.reduce(function(a, b) {
      return b[prop] == null ? a : a + b[prop];
    }, 0);
  };

  calculateTotal = () => {
    var total = 0;
    for (var i = 0; i < this.props.items.length; i++) {
      total = total + this.props.items[i].price * this.props.items[i].value;
    }
    return total;
  };

  render() {
    return (
      <nav>
        <a href="http://saas.berkeley.edu">
          <img src={Logo} />
        </a>
        <h3>
          <a href="#">MERCH SHOP</a>
        </h3>
        <div className="iconText">
          <div className="navbarText">
            <p>Items {this.sumArray(this.props.items, "value")}</p>
            <p>Subtotal ${this.calculateTotal()}</p>
          </div>
          <a href="#">
            <img className="icon" src={CartIcon} />
          </a>
        </div>
        <div className="iconText">
          <div className="navbarText">
            <p>
              Hello, <strong>SAASie</strong>
            </p>
            <p>
              <a href="#">Sign in</a>
            </p>
          </div>
          <img className="icon" src={UserIcon} />
        </div>
      </nav>
    );
  }
}

export default NavBar;
