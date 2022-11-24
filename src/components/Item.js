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
    let { currencySymbol, itemPrice } = this.findCurrency(
      this.props.productProps
    );

    console.log(this.props.productProps);

    return (
      <div
        className={`PLPitem ${
          this.props.productProps.inStock ? "" : "outOfStock"
        }`}
        onClick={() => this.props.selectPDPItem(this.props.productProps, "PDP")}
      >
        <div>
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
        {this.props.productProps.inStock ? null : (
          <div className="outOfStockOverlay">
            <h4>OUT OF STOCK</h4>
          </div>
        )}
      </div>
    );
  }
}

export default Item;
