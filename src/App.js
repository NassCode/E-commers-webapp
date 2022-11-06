import logo from "./logo.svg";
import "./App.css";
// import class component
import React, { Component } from "react";
import PLP from "./components/PLP";
import Navbar from "./components/navbar";
import { client } from "./index";
import { CATEGORIES } from "./GraphQL/Queries";
import PDP from "./components/PDP";

class App extends Component {
  state = {
    categories: [],
    currentTab: "All",
    location: "PLP",
    currency: "USD",
    pdpItem: {},
    cart: [],
    cartOverlay: false,
  };

  componentDidMount() {
    client
      .query({
        query: CATEGORIES,
      })
      .then((result) => {
        this.setState({
          categories: result.data.categories,
        });
      });
  }

  tabChange = (tab) => {
    this.setState({ currentTab: tab, location: "PLP" });
  };

  changeLocation = (location) => {
    this.setState({ location: location });
  };

  changeCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  selectPDPItem = (item, location) => {
    this.setState({ pdpItem: item, location: location });
  };

  addToCart = (item) => {
    // let cart = this.state.cart;
    // cart.push(item);
    // this.setState({ cart: cart });
    this.setState({ cart: [...this.state.cart, item] });
  };

  toggleCartOverlay = () => {
    this.setState({ cartOverlay: !this.state.cartOverlay });
  };

  componentDidUpdate(p1, p2) {
    //rerender when cart changes
    if (p2.cart !== this.state.cart) {
      console.log("cart changed");
      console.log(p1.cart)
      console.log(p2.cart)
    }
  }


  render() {
    // console.log(this.state.cart);
    return (
      <div>
        <div>
          <Navbar
            tabChange={this.tabChange}
            currentTab={this.state.currentTab}
            toggleCartOverlay={this.toggleCartOverlay}
            cartOverlayState={this.state.cartOverlay}
            cartItems={this.state.cart}
          />
        </div>
        <div>
          {
            this.state.categories.length === 0 && <div>Loading...</div>
            // implement loading screen
            // implement what component to render based on state
          }
        </div>
        <div>
          {this.state.location === "PLP" &&
          this.state.categories.length !== 0 ? (
            <PLP
              categories={this.state.categories}
              currentTab={this.state.currentTab}
              changeLocation={this.changeLocation}
              selectPDPItem={this.selectPDPItem}
            />
          ) : null}

          {this.state.location === "PDP" &&
          this.state.categories.length !== 0 ? (
            <PDP
              pdpItem={this.state.pdpItem}
              changeLocation={this.changeLocation}
              addToCart={this.addToCart}
              cart={this.state.cart}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
