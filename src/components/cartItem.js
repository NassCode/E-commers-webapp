import { Component } from "react";

class CartItem extends Component {
  render() {
    console.log(this.props.item);
    return (
      <div className="cartItem">
        <div className="cartItemInfo">
          <h3>{this.props.item.itemInfo.brand}</h3>
          <h3>{this.props.item.itemInfo.name}</h3>
          <h3>{this.props.item.quantity}</h3>
          <span>{this.props.item.attributes.map((attr, i) =>
            <div key={i}>
              <span>{attr.name}: {attr.value}</span>
            </div>
          )}</span>
        </div>
      </div>
    );
  }
}

export default CartItem;