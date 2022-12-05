import logo from "./logo.svg";
import "./App.css";
// import class component
import React, { Component } from "react";
import PLP from "./components/PLP";
import Navbar from "./components/navbar";
import { client } from "./index";
import { CATEGORIES } from "./GraphQL/Queries";
import PDP from "./components/PDP";
import { CurrencyProvider } from "./currencyContext";
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
    // console.log(item);
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
      // console.log(newItemInCart);

      if (newItemInCart === undefined) {
        // console.log(item);
        this.setState({ cart: [...this.state.cart, item] });
      } else {
        // console.log(newItemInCart);
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
  }

  render() {
    console.log(this.state.cart);
    return (
      <CurrencyProvider value={this.state.currency}>
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
                currency={this.state.currency}
                addToCart={this.addToCart}


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
              />
            ) : null}

            {this.state.location === "Cart" &&
            this.state.categories.length !== 0 ? (
              <Cart
                cart={this.state.cart} />
            ) : null}



          </div>
        </div>
      </CurrencyProvider>
    );
  }
}

export default App;
