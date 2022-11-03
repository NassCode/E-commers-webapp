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
    console.log(item);
    // check if item is already in cart
    let itemInCart = this.state.cart.find((cartItem) => {
      return cartItem.itemInfo.id === item.itemInfo.id;
    });

    // add item to cart if it is not already in cart
    if (itemInCart === undefined) {
      this.setState({ cart: [...this.state.cart, item] });


    } else {
      //if item is already in cart, increment quantity
      let newCart = this.state.cart.map((cartItem) => {
        if (cartItem.itemInfo.id === item.itemInfo.id) {
          cartItem.quantity += item.quantity;
        }
        return cartItem;
      }
      );
      this.setState({ cart: newCart });
    }
       //   console.log(itemInCart);
    //   let valsOfItem = [];
    //   let valsOfItemInCart = [];

    //   item.attributes.forEach((attr) => {
    //     valsOfItem.push(attr.value);
    //   });

    //   itemInCart.attributes.forEach((attr) => {
    //     valsOfItemInCart.push(attr.value);
    //   });
    


    // this.setState({ cart: [...this.state.cart, item] });
   
    // console.log(itemInCart);
   
    // if (itemInCart === undefined) {
    //   // add item to cart
    //   console.log("item not in cart");
    //   this.setState({ cart: [...this.state.cart, item] });
    // } else {
    //   console.log(itemInCart);
     {/* let valsOfItem = [];
      let valsOfItemInCart = [];

      item.attributes.forEach((attr) => {
        valsOfItem.push(attr.value);
      });

      itemInCart.attributes.forEach((attr) => {
        valsOfItemInCart.push(attr.value);
      });

    //   console.log(valsOfItem);
    //   console.log(valsOfItemInCart);

      if (JSON.stringify(valsOfItem) === JSON.stringify(valsOfItemInCart)) {
        // increment quantity of item in cart
        let newCart = this.state.cart.map((cartItem) => {
          if (cartItem.itemInfo.id === item.itemInfo.id) {
            cartItem.quantity += 1;
          }
          return cartItem;
        });
        this.setState({ cart: newCart });
      }
    }*/}
  };

  toggleCartOverlay = () => {
    this.setState({ cartOverlay: !this.state.cartOverlay });
  };

  render() {
    console.log(this.state.cart);
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
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
