import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo.png";
import CartIcon from "../../assets/icons/supermarket.svg";
import UserIcon from "../../assets/icons/user.svg";
import { HashLink as Link } from "react-router-hash-link";
import "./NavBar.css";
import firebase from "../../firebase/firebase";

class NavBar extends Component {
  state = {
    total: 0,
    subtotal: 0,
    currentCart: this.props.currentCart,
    items: this.props.items,
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
    const { items, currentCart } = this.props;

    // being passed down correctly, function not working
    return (
      <nav>
        <a href="http://saas.berkeley.edu">
          <img src={Logo} alt="saas_logo" />
        </a>
        <h3>
          <Link to="/">MERCH SHOP</Link>
        </h3>
        <div className="iconText">
          <div className="navbarText">
            <p>Items {this.props.calculateNumItems(currentCart, items)}</p>
            <p>
              Subtotal ${this.props.calculateTotalPrice(currentCart, items)}
            </p>
          </div>
          <Link to="/cart">
            <img className="icon" src={CartIcon} alt="cart_icon" />
          </Link>
        </div>
        <div className="iconText">
          <div className="navbarText">
            {this.props.isAuth ? (
              <div>
                <Link to="/">
                  Hello, <strong>{this.props.firstname}</strong>
                </Link>
                <Link to="/logout">Logout</Link>
              </div>
            ) : (
              <div>
                <p>
                  Hello, <strong>SAASie</strong>
                </p>
                <Link to="/signin">Sign in</Link>
              </div>
            )}
            {/* <p>
                  <a href="#">Sign in</a>
                  </p> */}
          </div>
          <img className="icon" src={UserIcon} alt="user_icon" />
        </div>
      </nav>
    );
  }
}

export default NavBar;
