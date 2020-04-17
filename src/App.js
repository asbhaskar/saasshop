import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ShopHome from "./containers/ShopHome";
import Cart from "./components/Cart/Cart";

class App extends Component {
  render() {
    return <ShopHome />;
  }
}

export default App;
