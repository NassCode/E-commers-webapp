import { Component } from "react";

class CartItem extends Component {
  render() {
    console.log(this.props.item);
    return (
      <div className="cartItem">
        <div className="cartItemInfo">
          <span>{this.props.item.itemInfo.id}</span>
          <span>{this.props.item.itemInfo.quantity}</span>
        </div>
      </div>
    );
  }
}

export default CartItem;