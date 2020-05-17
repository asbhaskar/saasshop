import React, { Component } from "react";
import Logo from "../../assets/images/logo.png";
import CartIcon from "../../assets/icons/supermarket.svg";
import UserIcon from "../../assets/icons/user.svg";
import { HashLink as Link } from "react-router-hash-link";
import "./NavBar.css";
import PropTypes from "prop-types";

class NavBar extends Component {
  renderAuth = () => {
    const { auth, logOut, logIn } = this.props;
    if (auth) {
      return (
        <div className="navbarText">
          <div>Welcome, {auth.displayName}</div>
          <p align="right">
            <Link to="/" onClick={logOut}>Log Out</Link>
          </p>
        </div>
      );
    } else {
      return (
        <div className="navbarText">
          <div>Welcome, SAASie</div>
          <p align="right">
            <Link to="/" onClick={logIn}>Log In</Link>
          </p>
        </div>
      );
    }
  };

  render() {
    const {
      items,
      currentCart,
      calculateNumItems,
      calculateTotalPrice,
    } = this.props;
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
            <p>Items {calculateNumItems(currentCart, items)}</p>
            <p>Subtotal ${calculateTotalPrice(currentCart, items)}</p>
          </div>
          <Link to="/cart">
            <img className="icon" src={CartIcon} alt="cart_icon" />
          </Link>
        </div>
        <div className="iconText">
          {this.renderAuth()}
          <Link to="/user">
            <img className="icon" src={UserIcon} alt="user_icon" />
          </Link>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object,
  items: PropTypes.object,
  currentCart: PropTypes.object,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  calculateNumItems: PropTypes.func,
  calculateTotalPrice: PropTypes.func,
};

export default NavBar;
