import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo.png";
import CartIcon from "../../assets/icons/supermarket.svg";
import UserIcon from "../../assets/icons/user.svg";
import { HashLink as Link } from "react-router-hash-link";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    total: 0,
    subtotal: 0,
    currentCart: this.props.currentCart,
    items: this.props.items,
  };

  // componentDidUpdate(){
  //   console.log("update")
  //   console.log(this.props)
  // }

  calculateNumItems = (currentCart, items) => {
    console.log(currentCart);
    let total = 0;

    Object.keys(items).forEach((key) => {
      total += currentCart[key] ? currentCart[key] : 0;
    });

    return total;
  };

  calculateTotalPrice = (currentCart, items) => {
    let total = 0;

    Object.keys(items).forEach((key) => {
      total +=
        items[key].sales_price * (currentCart[key] ? currentCart[key] : 0);
    });

    return total.toFixed(2);
  };

  render() {
    const { items, currentCart } = this.props;
    console.log(currentCart);

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
            <p>Items {this.calculateNumItems(currentCart, items)}</p>
            <p>Subtotal ${this.calculateTotalPrice(currentCart, items)}</p>
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    firstname: state.auth.firstname,
  };
};

export default connect(mapStateToProps)(NavBar);
