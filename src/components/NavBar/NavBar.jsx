import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo.png";
import CartIcon from "../../assets/icons/supermarket.svg";
import UserIcon from "../../assets/icons/user.svg";
import { HashLink as Link } from "react-router-hash-link";
import "./NavBar.css";

class NavBar extends Component {
  sumArray = (items, prop) => {
    if (items == null) {
      return 0;
    }
    return items.reduce(function (a, b) {
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
          <img className="icon" src={UserIcon} />
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
