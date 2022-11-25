import React, { Component } from "react";

class Attrs extends Component {
  state = {
    itemInfo: this.props.attrs,
    quantity: 1,
    attributes: [],
  };

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
    console.log(this.props.selectedAttrs);
    console.log(this.props.initialSelection);
    let { currencySymbol, itemPrice } = this.findCurrency(this.props.attrs);
    
    // console.log(this.state);
    return (
      <div className="Attrs">
        <div className="Attrs__container">
          <div className="Attrs__container__img">
            <h1>{this.props.attrs.brand}</h1>
            <h5>{this.props.attrs.name}</h5>
          </div>
          <div>
            {this.props.attrs.attributes.map((attr, i) => (
              <div key={attr.id}>
                <h2>{attr.name}:</h2>
                <div className="itemAtrrs">
                  {attr.items.map((item, i) => (
                    <div key={item.id}>
                      <h2 className="attrsRep"
                        onClick={() =>
                          this.props.setSelection(
                            this.props.attrs.id,
                            attr.name,
                            item.value
                          )
                        }
                      >
                        {item.displayValue}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3>{this.props.attrs.prices[0].__typename}:</h3>
              <h2>
                {currencySymbol} {itemPrice}
              </h2>
            </div>
            <div>
              <button onClick={() => this.props.handleSubmit()}>
                add to cart
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: this.props.attrs.description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Attrs;
