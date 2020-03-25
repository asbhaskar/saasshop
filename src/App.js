import React, { Component } from "react";
import NavBar from "./components/navbar";
import Shop from "./components/shop";
import Cart from "./components/cart";
import "./App.css";
import Zoomer from "./assets/images/shirts/zoomer.png";
import Logo from "./assets/images/stickers/SAAS_logo.png";

class App extends Component {
  state = {
    items: [
      {
        id: 1,
        value: 0,
        name: "Ok Zoomer",
        price: 20,
        image: Zoomer
      },
      {
        id: 2,
        value: 0,
        name: "SAAS Logo",
        price: 2,
        image: Logo
      }
    ]
  };

  handleIncrement = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].value++;
    this.setState({ items });
  };

  handleDecrement = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    if (items[index].value > 0) {
      items[index].value--;
    }
    this.setState({ items });
  };

  handleDelete = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].value = 0;
    this.setState({ items });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar items={this.state.items.filter(i => i.value > 0)} />
        <main className="container">
          <Shop
            items={this.state.items}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
          />
        </main>
        <main className="container">
          <Cart
            items={this.state.items.filter(i => i.value > 0)}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
