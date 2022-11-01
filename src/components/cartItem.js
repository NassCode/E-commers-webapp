import { Component } from "react";

class CartItem extends Component {
  render() {
    return (
      <div className="cartItem">
        <div className="cartItemInfo">
          <span>{this.props.item.id}</span>
          <span>{this.props.item.quantity}</span>
        </div>
      </div>
    );
  }
}

export default CartItem;