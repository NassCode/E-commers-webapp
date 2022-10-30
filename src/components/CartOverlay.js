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
           {this.props.cartItems.length === 0 ?
            <h2>cart is empty</h2> :
            <div>
              {this.props.cartItems.map((item, i) => (
                <div className="cartItem" key={i}>
                  <div className="cartItemInfo">
                    <span>{item.id}</span>
                    <span>{item.quantity}</span>
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
