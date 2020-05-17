import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Cart/Cart";
import AdminUI from "../components/Admin/AdminUI";
import UserUI from "../components/User/UserUI";
import AddMerch from "../components/Admin/AddMerch";
import "./ShopHome.css";
import SignIn from "../components/SignIn/SignIn";
import Zoomer from "../assets/images/shirts/zoomer.png";
import Logo from "../assets/images/stickers/SAAS_logo.png";
import firebase from "../firebase/firebase";
const provider = new firebase.auth.GoogleAuthProvider();
class ShopHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: 1,
          value: 0,
          name: "DOGDOGDOG",
          price: 20,
          image: Zoomer,
        },
        {
          id: 2,
          value: 0,
          name: "SAAS Logo",
          price: 2,
          image: Logo,
        },
      ],
      data: {},
      currentCart: {},
      orders: {},
      adminEmailList: [],
      auth: null,
    };
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      this.setState({ auth: user });
    });

    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    this.pullShopItems();
    this.pullPastOrders();
    this.pullAdminEmails();
  }

  pullShopItems = () => {
    firebase
      .firestore()
      .collection("inventory")
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          const data = this.state.data;
          data[item.id] = item.data();
          this.setState({ data });
        });
      });
  };

  pullAdminEmails = () => {
    firebase
      .firestore()
      .collection("admin")
      .doc("emails")
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        this.setState({ adminEmailList: data.email_list });
      });
  };

  pullPastOrders = () => {
    firebase
      .firestore()
      .collection("orders")
      .get()
      .then((snapshot) => {
        snapshot.forEach((order) => {
          const orders = this.state.orders;
          orders[order.id] = order.data();
          this.setState({ orders });
        });
      });
  };

  firebasePush = (item) => {
    console.log(item.image);
    const ref = firebase.storage().ref();
    const name = item.description;
    const newRef = ref.child(name + ".png");
    newRef.put(item.image).then(() => {
      newRef.getDownloadURL().then((url) => {
        console.log(url);
        const newInventory = {
          category: item.category,
          description: item.description,
          image_url: url,
          on_order: 0,
          sales_price: item.price,
          size_stock: {},
          sizes: [],
          stock: item.quantity,
        };

        firebase.firestore().collection("inventory").add(newInventory);
      });
    });
  };

  // Function to update the quantity of an item in cart
  onChange = (itemId, direction) => {
    const cart = this.state.currentCart;
    const currentCart = cart[itemId] ? cart[itemId] : 0;
    const stock = this.state.data[itemId].stock;
    let updatedCount =
      currentCart + direction < 0 ? 0 : currentCart + direction;
    if (updatedCount > stock) {
      updatedCount = stock;
      alert("Cannot add item to cart. Max stock of item reached.");
    }
    cart[itemId] = updatedCount;
    this.setState({ cart });
  };

  // Function to calculate the total number of items in cart
  calculateNumItems = (currentCart, items) => {
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

  // Function to update the quantity of an item in stock (admin only)
  // THIS DOESN'T FULLY WORK LOL
  updateStock = (itemId, direction) => {
    const data = this.state.data;
    const currentStock = this.state.data[itemId].stock;
    let updatedCount =
      currentStock + direction < 0 ? 0 : currentStock + direction;
    data[itemId].stock = updatedCount;
    //need to actually update firebase
    console.log(data[itemId].stock);
    this.setState({ data });
  };

  logOut = () => {
    console.log("log out");
    firebase.auth().signOut();
  };

  logIn = () => {
    console.log("log in");
    firebase.auth().signInWithRedirect(provider);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          items={this.state.data}
          onChange={this.onChange}
          currentCart={this.state.currentCart}
          calculateTotalPrice={this.calculateTotalPrice}
          calculateNumItems={this.calculateNumItems}
          logIn={this.logIn}
          logOut={this.logOut}
          auth={this.state.auth}
        />
        <div class="gradient-divide"></div>
        <Route
          exact
          path="/"
          render={(props) => (
            <Shop
              items={this.state.data}
              onChange={this.onChange}
              currentCart={this.state.currentCart}
              auth={this.state.auth}
              adminEmailList={this.state.adminEmailList}
            />
          )}
        />
        <Route
          exact
          path="/signin"
          render={() => (
            <SignIn
              items={this.state.data}
              onChange={this.onChange}
              currentCart={this.state.currentCart}
            />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <Cart
              {...props}
              items={this.state.data}
              currentCart={this.state.currentCart}
              onChange={this.onChange}
              calculateTotalPrice={this.calculateTotalPrice}
              calculateNumItems={this.calculateNumItems}
            />
          )}
        />

        <Route
          path="/user"
          render={(props) => (
            <UserUI
              {...props}
              items={this.state.data}
              orders={this.state.orders}
            />
          )}
        />
        <Route
          path="/admin"
          render={(props) => (
            <AdminUI
              {...props}
              items={this.state.data}
              updateStock={this.updateStock}
            />
          )}
        />

        <Route
          path="/addmerch"
          render={(props) => (
            <AddMerch {...props} firebasePush={this.firebasePush} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ShopHome;
