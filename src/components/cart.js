import { Component } from "react";


class Cart extends Component {

  render() {
    console.log(this.props.cart);
    return (
      <div>
        <h1>Cart</h1>
      </div>
    );
  }
}

export default Cart;