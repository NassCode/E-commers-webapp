import React, { Component } from "react";

class Attrs extends Component {
  state = {
    itemInfo: this.props.attrs,
    quantity: 1,
    attributes: [],
  };

  // selected = (attr) => {
  //   console.log(attr);
  //   if (this.props.selectedAttrs.length === 0) {
  //     if (attr.value === this.props.initialSelection.attributes[attr.name].value) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     if (attr.value === this.props.selectedAttrs.attributes[attr.name].value) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  // }

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
    // console.log(this.props.selectedAttrs);
    // console.log(this.props.initialSelection);
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
                      <h2
                        className={`attrsRep ${
                          isSelected(item, attr.name, attr.type)
                            ? "attrSelected"
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            attr.type === "swatch" ? item.value : "",
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
              {this.props.attrs.inStock ? (
                <button onClick={() => this.props.handleSubmit()}>
                add to cart
              </button>
              ) : (
                <button disabled>Out of Stock</button>
              )}
              
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
