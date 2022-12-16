import React, { Component } from "react";
import cartOutline from "./icons/cart-outline.svg";
import CartItem from "./cartItem";
import CurrencyContext from "../currencyContext";

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.iconRef = React.createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
    document.addEventListener("click", this.handleIconClick, true);
  }

  handleClickOutside(event) {
    if (
      this.ref.current &&
      !this.ref.current.contains(event.target) &&
      event.target.accessKey !== "cartKey"
    ) {
      this.props.toggleCartOverlay();
    } else if (
      this.ref.current &&
      !this.ref.current.contains(event.target) &&
      event.target.accessKey === "cartKey"
    ) {
      return;
    }
  }

  handleIconClick = (event) => {
    if (this.iconRef.current && this.iconRef.current.contains(event.target)) {
      this.props.toggleCartOverlay();
    }
  };

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
    // console.log(this.props);
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

    // console.log(this.context);

    return (
      <div>
        <div className="iconWrapper">
          <img
            className="cartIcon"
            ref={this.iconRef}
            accessKey="cartKey"
            src={cartOutline}
          />
          {total === 0 ? null : <p className="miniCartCount">{total}</p>}
        </div>

        {this.props.cartOverlayState === false ? null : (
          <div
            ref={this.ref}
            className={`${
              this.props.cartItems.length === 0
                ? "cartOverLayEmbt"
                : "cartOverLay"
            }`}
          >
            {this.props.cartItems.length === 0 ? (
              <h2>cart is empty</h2>
            ) : (
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
                        location={this.props.location}
                        miniCart={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="cartTotalPrice">
              <div>
                <h4>Totall: </h4>
              </div>
              <div>
                <h4>
                  {parseFloat(totalPrice.toFixed(2))}{" "}
                  {this.props.currency.symbol}
                </h4>
              </div>
            </div>
            <div className="cartBtnsContainer">
              <div>
                <button
                  className="viewBagBtn"
                  onClick={() => this.props.viewCart()}
                >
                  VIEW BAG
                </button>
              </div>
              <div>
                <button className="checkoutBtn">CHECKOUT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CartOverlay;
