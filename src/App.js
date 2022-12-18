import "./App.css";
import React, { Component } from "react";
import PLP from "./components/PLP";
import Navbar from "./components/navbar";
import { client } from "./index";
import { CATEGORIES } from "./GraphQL/Queries";
import PDP from "./components/PDP";
import Cart from "./components/cart";

class App extends Component {
  state = {
    categories: [],
    categoriesList: [],
    currencies: [],
    currentTab: "",
    location: "PLP",
    currency: {},
    pdpItem: {},
    cart: [],
    cartOverlay: false,
    currencyMenu: false,
  };

  componentDidMount() {
    // check if local storage has an App key
    if (localStorage.getItem("App")) {
      // if it does, set the state to the value of the App key
      this.setState(JSON.parse(localStorage.getItem("App")));
    } else {
      client
        .query({
          query: CATEGORIES,
        })
        .then((result) => {
          let categoriesList = result.data.categories.map((category) => {
            return category.name;
          });

          this.setState({
            categories: result.data.categories,
            currencies: result.data.currencies,
            currency: result.data.currencies[0],
            categoriesList: categoriesList,
            currentTab: categoriesList[0],
          });
        });
    }
  }

  //on update, set local storage to the current state
  componentDidUpdate() {
    localStorage.setItem("App", JSON.stringify(this.state));
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
    // check if item is already in cart
    let itemInCart = this.state.cart.find((cartItem) => {
      return cartItem.itemInfo.id === item.itemInfo.id;
    });
    // add item to cart if it is not already in cart
    if (itemInCart === undefined) {
      this.setState({ cart: [...this.state.cart, item] });
    } else {
      // check if item with same attributes is already in cart
      let newItemInCart = this.state.cart.find((cartItem) => {
        return (
          cartItem.itemInfo.id === item.itemInfo.id &&
          cartItem.attributes.every((attr) => {
            return item.attributes.some((attr2) => {
              return attr.name === attr2.name && attr.value === attr2.value;
            });
          })
        );
      });

      if (newItemInCart === undefined) {
        this.setState({ cart: [...this.state.cart, item] });
      } else {
        let newCart = [...this.state.cart];
        let index = newCart.indexOf(newItemInCart);
        newCart[index].quantity++;
        this.setState({ cart: newCart });
      }
    }
  };

  // increment quantity of item in cart
  incrementQuantity = (item) => {
    let newCart = [...this.state.cart];
    let index = newCart.indexOf(item);
    newCart[index].quantity++;
    this.setState({ cart: newCart });
  };

  // decrement quantity of item in cart
  decrementQuantity = (item) => {
    let newCart = [...this.state.cart];
    let index = newCart.indexOf(item);
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
      this.setState({ cart: newCart });
    } else {
      newCart.splice(index, 1);
      this.setState({ cart: newCart });
    }
  };

  toggleCartOverlay = () => {
    this.setState({ cartOverlay: !this.state.cartOverlay });
  };

  toggleCurrencyMenu = () => {
    this.setState({ currencyMenu: !this.state.currencyMenu });
  };

  selectCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  viewCart = () => {
    this.setState({ location: "Cart", cartOverlay: false });
  };

  render() {
    return (
        <div>
          <div>
            <Navbar
              tabChange={this.tabChange}
              currentTab={this.state.currentTab}
              toggleCartOverlay={this.toggleCartOverlay}
              cartOverlayState={this.state.cartOverlay}
              cartItems={this.state.cart}
              incrementQuantity={this.incrementQuantity}
              decrementQuantity={this.decrementQuantity}
              toggleCurrencyMenu={this.toggleCurrencyMenu}
              currencyMenuState={this.state.currencyMenu}
              currencies={this.state.currencies}
              selectCurrency={this.selectCurrency}
              currency={this.state.currency}
              tabs={this.state.categoriesList}
              changeLocation={this.changeLocation}
              viewCart={this.viewCart}
              location={this.state.location}
            />
          </div>
          <div>
            {this.state.categories.length === 0 && <div>Loading...</div>}
          </div>
          <div>
            {this.state.location === "PLP" &&
            this.state.categories.length !== 0 ? (
              <PLP
                categories={this.state.categories}
                currentTab={this.state.currentTab}
                changeLocation={this.changeLocation}
                selectPDPItem={this.selectPDPItem}
                currency={this.state.currency}
                addToCart={this.addToCart}
                cartOverlayState={this.state.cartOverlay}
                location={this.state.location}
              />
            ) : null}

            {this.state.location === "PDP" &&
            this.state.categories.length !== 0 ? (
              <PDP
                pdpItem={this.state.pdpItem}
                changeLocation={this.changeLocation}
                addToCart={this.addToCart}
                cart={this.state.cart}
                currency={this.state.currency}
                cartOverlayState={this.state.cartOverlay}
                location={this.state.location}
              />
            ) : null}

            {this.state.location === "Cart" &&
            this.state.categories.length !== 0 ? (
              <Cart
                cartItems={this.state.cart}
                incrementQuantity={this.incrementQuantity}
                decrementQuantity={this.decrementQuantity}
                currency={this.state.currency}
                location={this.state.location}
                cartOverlayState={this.state.cartOverlay}
              />
            ) : null}
          </div>
        </div>
    );
  }
}

export default App;
