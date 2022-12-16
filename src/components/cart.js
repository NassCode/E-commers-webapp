import { Component } from "react";
import CartItem from "./cartItem";

class Cart extends Component {
  findCurrencyIndex = (item) => {
    let currency = this.props.currency;
    let currencyIndex = 0;
    item.prices.forEach((price, index) => {
      if (price.currency.symbol === currency.symbol) {
        currencyIndex = index;
      }
    });
    return currencyIndex;
  };

  render() {
    // sum up total of cart items quantity
    let total = 0;
    this.props.cartItems.forEach((item) => {
      total += item.quantity;
    });

    // sum up total of cart items price
    let totalPrice = 0;
    let currencyIndex =
      this.props.cartItems.length > 0
        ? this.findCurrencyIndex(this.props.cartItems[0].itemInfo)
        : 0;

    this.props.cartItems.forEach((item) => {
      totalPrice += item.itemInfo.prices[currencyIndex].amount * item.quantity;
    });

    let tax = totalPrice * 0.21;

    return (
      <div>
        <div className="locationRep">
          <h2>CART</h2>
        </div>

        <div className="mainCart">
          {this.props.cartItems.length === 0 ? (
            <h2>cart is empty</h2>
          ) : (
            <div>
              {this.props.cartItems.map((item, i) => (
                <div className="mainCartItem" key={i}>
                  <div className="cartItemInfo">
                    <CartItem
                      item={item}
                      incrementQuantity={this.props.incrementQuantity}
                      decrementQuantity={this.props.decrementQuantity}
                      currency={this.props.currency}
                      miniCart={false}
                      location={this.props.location}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="cartTotallContainer">
            <p>
              Tax 21%: <span>{`${parseFloat(tax.toFixed(2))}`} $</span>
            </p>

            <p>
              Quantity: <span>{total}</span>
            </p>
            <p>
              Totall:{" "}
              <span>
                {parseFloat(totalPrice.toFixed(2))} {this.props.currency.symbol}
              </span>
            </p>
          </div>
          <div>
            <button className="orderBtn">ORDER</button>
          </div>
        </div>
        <div
          className={`${
            this.props.cartOverlayState === true &&
            this.props.location === "Cart"
              ? "overcast"
              : ""
          }`}
        >
          <p></p>
        </div>
      </div>
    );
  }
}

export default Cart;
