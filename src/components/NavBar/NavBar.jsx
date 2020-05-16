import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo.png";
import CartIcon from "../../assets/icons/supermarket.svg";
import UserIcon from "../../assets/icons/user.svg";
import { HashLink as Link } from "react-router-hash-link";
import "./NavBar.css";
import firebase from "../../firebase/firebase";

class NavBar extends Component {
  sumArray = (items, prop) => {
    if (items == null) {
      return 0;
    }
    return items.reduce(function (a, b) {
      return b[prop] == null ? a : a + b[prop];
    }, 0);
  };

  calculateNumItems = (currentCart, items) => {
    var total = 0;

    Object.keys(items).forEach((key) => {
      total += currentCart[key] ? currentCart[key] : 0;
    });

    return total;
  };

  calculateTotalPrice = (currentCart, items) => {
    var total = 0;

    Object.keys(items).forEach((key) => {
      total +=
        items[key].sales_price * (currentCart[key] ? currentCart[key] : 0);
    });

    return total.toFixed(2);
  };

  calculateTotal = () => {
    var total = 0;
    for (var i = 0; i < this.props.items.length; i++) {
      total = total + this.props.items[i].price * this.props.items[i].value;
    }
    return total;
  };

  renderAuth = () => {
    if (firebase.auth().currentUser) {
      //alert("LogOut");
      return (
        <div>
          <p>Welcome, {firebase.auth().currentUser.displayName}</p>
          <p align="right">
            <button onClick={this.props.logOut}>Log Out</button>
          </p>
        </div>
      );
    } else {
      //alert("LogIn");
      return (
        <div>
          <p>Welcome, SAASie</p>
          <p align="right">
            <button onClick={this.props.logIn}>Log In</button>
          </p>
        </div>
      );
    }
  };

  render() {
    console.log("hi");
    return (
      <nav>
        <a href="http://saas.berkeley.edu">
          <img src={Logo} />
        </a>
        <h3>
          <Link to="/">MERCH SHOP</Link>
        </h3>
        <div className="iconText">
          <div className="navbarText">
            <p>Items {this.sumArray(this.props.items, "value")}</p>
            <p>Subtotal ${this.calculateTotal()}</p>
          </div>
          <Link to="/cart">
            <img className="icon" src={CartIcon} />
          </Link>
        </div>
        <div className="iconText">
          <div className="navbarText">{this.renderAuth()}</div>
          <img className="icon" src={UserIcon} />
        </div>
      </nav>
    );
  }
}

export default NavBar;
