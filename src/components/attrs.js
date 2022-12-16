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
    let { currencySymbol, itemPrice } = this.findCurrency(this.props.attrs);
    let isSelected = (item, name, type) => {
      if (
        this.props.selectedAttrs.length === 0 &&
        this.props.initialSelection.length === 0
      ) {
        // console.log("no selection");
        return false;
      } else {
        if (this.props.initialSelection.attributes === undefined) {
          // console.log("im here")
          return false;
        } else {
          // console.log(item)
          // console.log(name)
          let selected = this.props.initialSelection.attributes.find(
            (attr) => attr.name === name
          );
          // console.log('selected');

          if (selected === undefined) {

            // console.log("undefined");
            return false;
          } else {
            if (selected.value === item.value) {
              // console.log("true");
              return true;
            }
          }
          // console.log(this.props.initialSelection);
        }
      }
    };

    return (
      <div className="Attrs">
        <div className="Attrs__container">
          <div>
            <p className="itemBrand">{this.props.attrs.brand}</p>
            <p className="itemName">{this.props.attrs.name}</p>
          </div>
          <div>
            {this.props.attrs.attributes.map((attr, i) => (
              <div key={attr.id}>
                <div className="attrName">{attr.name.toUpperCase()}:</div>
                <div className="itemAtrrs">
                  {attr.items.map((item, i) => (
                    <div key={item.id}>
                      <h3
                        className={`attrsRep ${
                          isSelected(item, attr.name, attr.type)
                            ? "attrSelected"
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            attr.type === "swatch" ? item.value : "",
                          border: attr.type === "swatch" ? "0.5px solid #cdcdcd" : "",
                          paddingTop: attr.type === "swatch" ? "0" : "10px",
                          paddingBottom: attr.type === "swatch" ? "0" : "10px",
                          paddingLeft: attr.type === "swatch" ? "0" : "20px",
                          paddingRight: attr.type === "swatch" ? "0" : "20px",
                        }}
                        onClick={() =>
                          this.props.setSelection(
                            this.props.attrs.id,
                            attr.name,
                            item.value,
                            attr.type,
                            item.displayValue
                          )
                        }
                      >
                        {attr.type === "swatch" ? (
                          <div
                            className={`colorBox ${
                              isSelected(item, attr.name, attr.type)
                                ? "colorSelected"
                                : ""
                            }`}
                          ></div>
                        ) : (
                          item.displayValue
                        )}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3 className="price">{this.props.attrs.prices[0].__typename.toUpperCase()}:</h3>
              <h2>
                {currencySymbol} {itemPrice}
              </h2>
            </div>
            <div>
              {this.props.attrs.inStock ? (
                <button className="addToCartBtn" onClick={() => this.props.handleSubmit()}>
                ADD TO CART
              </button>
              ) : (
                <button className="outOfStockBtn" disabled>Out of Stock</button>
              )}
              
            </div>
            <div className="description"
              dangerouslySetInnerHTML={{ __html: this.props.attrs.description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Attrs;
