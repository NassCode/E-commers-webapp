import React, { Component } from "react";
import cartOutline from "./icons/cart-outline.svg";

class CartOverlay extends Component {
  render() {
    console.log(this.props.cartItems);
    return (
      <div>
        <img src={cartOutline} />
        {this.props.cartOverlayState === false ? null : (
          <div className="cartOverLay">
            <h2></h2>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default CartOverlay;
