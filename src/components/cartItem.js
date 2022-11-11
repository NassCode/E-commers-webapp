import { Component } from "react";

class CartItem extends Component {
  findCurrency = (item) => {
    let currency = this.props.currency;
    let currencySymbol = "";
    let itemPrice = 0;
    item.itemInfo.prices.forEach((price) => {
      if (price.currency.symbol === currency.symbol) {
        currencySymbol = price.currency.symbol;
        itemPrice = price.amount;
      }
    });
    return { currencySymbol, itemPrice };
  };


  render() {
    // console.log(this.props);
    let { currencySymbol, itemPrice } = this.findCurrency(
      this.props.item
    );

    return (
      <div className="cartItem">
        <div className="cartItemInfo">
          <h3>{this.props.item.itemInfo.brand}</h3>
          <h3>{this.props.item.itemInfo.name}</h3>
          <h3>{this.props.item.quantity} <span>
            <button onClick={() => this.props.incrementQuantity(this.props.item)}>+</button>
            <button onClick={() => this.props.decrementQuantity(this.props.item)}>-</button>
            </span></h3>
          <h3>{itemPrice * this.props.item.quantity}{" "}{currencySymbol}</h3>
          <span>{this.props.item.attributes.map((attr, i) =>
            <div key={i}>
              <span>{attr.name}: {attr.value}</span>
            </div>
          )}</span>
          <div>
            <img className="miniCartImg" src={this.props.item.itemInfo.gallery[0]} />
          {this.props.item.itemInfo.attributes.map((attr, i) => (
              <div key={attr.id}>
                <h4>{attr.name}:</h4>
                <div className="itemAtrrs">
                  {attr.items.map((item, i) => (
                    <div key={item.id}>
                      <h4>
                        {item.displayValue}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;