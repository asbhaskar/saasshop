import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ShopHome from "./containers/ShopHome";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={ShopHome}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
