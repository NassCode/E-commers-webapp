import React, { Component } from "react";
import cartOutline from "./icons/cart-outline.svg";

class CartOverlay extends Component {
  render() {
    return (
      <img src={cartOutline} />
    );
  }
}

export default CartOverlay;