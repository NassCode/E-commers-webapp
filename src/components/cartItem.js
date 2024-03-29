import { Component } from "react";

class CartItem extends Component {
  state = {
    currentImageIndex: 0,
  };

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

  imageSwitch = (direction) => {
    let { currentImageIndex } = this.state;
    let { gallery } = this.props.item.itemInfo;
    if (direction === "next") {
      if (currentImageIndex === gallery.length - 1) {
        this.setState({ currentImageIndex: 0 });
      } else {
        this.setState({ currentImageIndex: currentImageIndex + 1 });
      }
    } else if (direction === "prev") {
      if (currentImageIndex === 0) {
        this.setState({ currentImageIndex: gallery.length - 1 });
      } else {
        this.setState({ currentImageIndex: currentImageIndex - 1 });
      }
    }
  };

  render() {
    let { currencySymbol, itemPrice } = this.findCurrency(this.props.item);

    let isSelected = (item, name) => {
      if (this.props.item.attributes === undefined) {
        return false;
      } else {
        let selected = this.props.item.attributes.find(
          (attr) => attr.name === name
        );
        if (selected === undefined) {
          return false;
        } else {
          if (selected.value === item.value) {
            return true;
          }
        }
      }
    };

    let totalPrice = itemPrice * this.props.item.quantity;
    return (
      <div className={`${this.props.miniCart ? "cartItem" : "mainCartItem"}`}>
        <div className="cartItemInfo">
          <div className="itemInfo">
            <>
              <div className={`${this.props.miniCart ? "" : "mcItemBrand"}`}>
                {this.props.item.itemInfo.brand}
              </div>
              <div className={`${this.props.miniCart ? "" : "mcItemName"}`}>
                {this.props.item.itemInfo.name}
              </div>
              <div
                className={`${this.props.miniCart ? "price" : "mainCartPrice"}`}
              >
                {parseFloat(totalPrice.toFixed(2))} {currencySymbol}
              </div>
            </>

            <div className="itemAttributes">
              {this.props.item.itemInfo.attributes.map((attr, i) => (
                <div className="attrname" key={attr.id}>
                  <div className={`${this.props.miniCart ? "" : "attrName"}`}>
                    {attr.name}:
                  </div>
                  <div className="itemAtrrs">
                    {attr.items.map((item, i) => (
                      <div key={item.id}>
                        <div
                          className={`${attr.type !== 'swatch' ? 'attrsRep': ''} ${
                            isSelected(item, attr.name, attr.type)
                              ? "attrSelected"
                              : ""
                          }`}
                          style={
                            this.props.miniCart
                              ? {
                                  backgroundColor:
                                    attr.type === "swatch" ? item.value : "",
                                  border:
                                    attr.type === "swatch"
                                      ? "0.5px solid #cdcdcd"
                                      : "",
                                  paddingTop:
                                    attr.type === "swatch" ? "0" : "3px",
                                  paddingBottom:
                                    attr.type === "swatch" ? "0" : "3px",
                                  paddingLeft:
                                    attr.type === "swatch" ? "0" : "7px",
                                  paddingRight:
                                    attr.type === "swatch" ? "0" : "7px",
                                }
                              : {
                                  backgroundColor:
                                    attr.type === "swatch" ? item.value : "",
                                  border:
                                    attr.type === "swatch"
                                      ? "0.5px solid #cdcdcd"
                                      : "",
                                  paddingTop:
                                    attr.type === "swatch" ? "0" : "10px",
                                  paddingBottom:
                                    attr.type === "swatch" ? "0" : "10px",
                                  paddingLeft:
                                    attr.type === "swatch" ? "0" : "20px",
                                  paddingRight:
                                    attr.type === "swatch" ? "0" : "20px",
                                }
                          }
                        >
                          {attr.type === "swatch" ? (
                            <div
                              className={`${
                                this.props.miniCart
                                  ? "miniCartColorBox"
                                  : "colorBox"
                              } ${
                                isSelected(item, attr.name, attr.type)
                                  ? "colorSelected"
                                  : ""
                              }`}
                            ></div>
                          ) : (
                            item.displayValue
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="incDecImgContainer">
            <div className="quantityLayout">
              <div>
                <button
                  onClick={() => this.props.incrementQuantity(this.props.item)}
                >
                  +
                </button>
              </div>

              <div>
                <h3>{this.props.item.quantity} </h3>
              </div>

              <div>
                <button
                  onClick={() => this.props.decrementQuantity(this.props.item)}
                >
                  -
                </button>
              </div>
            </div>

            <div className="cartImgContainer">
              <img
                className="miniCartImg"
                src={
                  this.props.item.itemInfo.gallery[this.state.currentImageIndex]
                }
              />
              {this.props.item.itemInfo.gallery.length > 1 &&
              this.props.miniCart === false ? (
                <div className="miniCartImgNav">
                  <div>
                    <button
                      onClick={() => this.imageSwitch("prev")}
                      className="miniCartImgNavBtn"
                    >
                      {"<"}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => this.imageSwitch("next")}
                      className="miniCartImgNavBtn"
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
