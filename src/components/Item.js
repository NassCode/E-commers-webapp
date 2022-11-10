import React, { Component } from "react";
import cartOutline from "./icons/cart-outline.svg";

class Item extends Component {
  // find current currency and price in item prices array
  findCurrency = (item) => {
    let currency = this.props.currency;
    let currencySymbol = "";
    let itemPrice = 0;
    item.prices.forEach((price) => {
      if (price.currency.symbol === currency.symbol) {
        currencySymbol = price.currency.symbol;
        itemPrice = price.amount;
      }
    });
    return { currencySymbol, itemPrice };
  };

  render() {
    console.log(this.findCurrency(this.props.productProps));
    let { currencySymbol, itemPrice } = this.findCurrency(
      this.props.productProps
    );

    return (
      <div
        className="PLPitem"
        onClick={() => this.props.selectPDPItem(this.props.productProps, "PDP")}
      >
        <div className="PLPimageContainer">
          <img
            className="PLPimage"
            src={this.props.productProps.gallery[0]}
            alt={cartOutline}
          />
        </div>
        <div className="PLPitemInfo">
          <span>{this.props.productProps.name}</span>
          <span>
            {itemPrice} {currencySymbol}
          </span>
        </div>
      </div>
    );
  }
}

export default Item;
