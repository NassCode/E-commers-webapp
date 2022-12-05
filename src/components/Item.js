import React, { Component } from "react";
import cartOutline from "./icons/cart-outline.svg";
import Common from "./icons/Common.svg";

class Item extends Component {
  state = {
    hover: false,
  }
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

  handleSubmitt = () => {
    let itemToSubmit = {
      itemInfo: this.props.productProps,
      quantity: 1,
      attributes: [],
    }
    this.props.addToCart(itemToSubmit);
  };

  render() {
    let { currencySymbol, itemPrice } = this.findCurrency(
      this.props.productProps
    );
    console.log(this.props);

    return (
      <div
        className={`PLPitem ${
          this.props.productProps.inStock ? "" : "outOfStock"
        }`}
        onClick={() => this.props.selectPDPItem(this.props.productProps, "PDP")}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div>
          <div className="PLPimageContainer">
            <img
              className="PLPimage"
              src={this.props.productProps.gallery[0]}
              alt={cartOutline}
            />
          </div>
         {this.state.hover === true && this.props.productProps.inStock === true ? 
          <div onClick={this.handleSubmitt} className="quickAdd">
          <img src={Common} />
        </div>
        : null}
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
