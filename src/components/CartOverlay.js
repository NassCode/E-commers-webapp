import React, { Component } from "react";
import cartOutline from "./icons/cart-outline.svg";
import CartItem from "./cartItem";
import CurrencyContext from "../currencyContext";

class CartOverlay extends Component {
  static contextType = CurrencyContext;
  // find the index of the current currrency in the item prices array
  findCurrencyIndex = (item) => {
    let currency = this.props.currency
    let currencyIndex = 0
    item.prices.forEach((price, index) => {
      if (price.currency.symbol === currency.symbol) {
        currencyIndex = index
      }
    })
    return currencyIndex
  }


  render() {
    console.log(this.props);
    // sum up total of cart items quantity
    let total = 0;
    this.props.cartItems.forEach((item) => {
      total += item.quantity;
    });


    // sum up total of cart items price
    let totalPrice = 0;
    // let currencyIndex = this.findCurrencyIndex(this.props.cartItems[0])
    this.props.cartItems.forEach((item) => {
      totalPrice += item.itemInfo.prices[0].amount * item.quantity;
    });

    // console.log(this.context);

  
    
    
    return (
      <div>
        <img onClick={() => this.props.toggleCartOverlay()} src={cartOutline} />
        {this.props.cartOverlayState === false ? null : (
          <div className="cartOverLay">
           {this.props.cartItems.length === 0 ?
            <h2>cart is empty</h2> :
            <div>
              <div>
                <h3>My Bag: {total} items </h3>
              </div>
              {this.props.cartItems.map((item, i) => (
                <div className="cartItem" key={i}>
                  <div className="cartItemInfo">
                    <CartItem 
                    item={item}
                    incrementQuantity={this.props.incrementQuantity}
                    decrementQuantity={this.props.decrementQuantity}
                    currency={this.props.currency}
                     />
                  </div>
                </div>
              ))}
            </div>}
            <div>
              <button>View Bag</button>
              <button>Checkout</button>

            </div>
            <div>
              <h4>Totall: {parseFloat(totalPrice.toFixed(2)) } $</h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CartOverlay;
