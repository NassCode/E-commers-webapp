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
    // console.log(this.props.mainCart);
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
    console.log(this.props.item.itemInfo.gallery);

    return (
      <div className="cartItem">
        <div className="cartItemInfo">
          <div className="itemInfo">
            <>
              <div>{this.props.item.itemInfo.brand}</div>
              <div>{this.props.item.itemInfo.name}</div>
              <div className="price">
                {parseFloat(totalPrice.toFixed(2))} {currencySymbol}
              </div>
            </>

            <div className="itemAttributes">
              {this.props.item.itemInfo.attributes.map((attr, i) => (
                <div className="attrname" key={attr.id}>
                  <div>{attr.name}:</div>
                  <div className="itemAtrrs">
                    {attr.items.map((item, i) => (
                      <div key={item.id}>
                        <div
                          className={`attrsRep ${
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
                              className={`colorBox ${
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
                  <button
                    onClick={() => this.imageSwitch("prev")}
                    className="miniCartImgNavBtn"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={() => this.imageSwitch("next")}
                    className="miniCartImgNavBtn"
                  >
                    {">"}
                  </button>
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
