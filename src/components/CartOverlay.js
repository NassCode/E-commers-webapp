import React, { Component } from "react";
import cartOutline from "./icons/cart-outline.svg";
import CartItem from "./cartItem";

class CartOverlay extends Component {
  render() {
    console.log(this.props.cartItems);
    return (
      <div>
        <img src={cartOutline} />
        {this.props.cartOverlayState === false ? null : (
          <div className="cartOverLay">
           {this.props.cartItems.length === 0 ?
            <h2>cart is empty</h2> :
            <div>
              {this.props.cartItems.map((item, i) => (
                <div className="cartItem" key={i}>
                  <div className="cartItemInfo">
                    <CartItem item={item} />
                  </div>
                </div>
              ))}
            </div>}
          </div>
        )}
      </div>
    );
  }
}

export default CartOverlay;
