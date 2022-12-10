import { Component } from "react";

class CartItem extends Component {
  state = {
    currentImageIndex: 0,
  }

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
          <h3>{this.props.item.itemInfo.brand}</h3>
          <h3>{this.props.item.itemInfo.name}</h3>
          <h3>
            {this.props.item.quantity}{" "}
            <span>
              <button
                onClick={() => this.props.incrementQuantity(this.props.item)}
              >
                +
              </button>
              <button
                onClick={() => this.props.decrementQuantity(this.props.item)}
              >
                -
              </button>
            </span>
          </h3>
          <h3>
            {parseFloat(totalPrice.toFixed(2))} {currencySymbol}
          </h3>
          <span>
          </span>
          <div>
            <img
              className="miniCartImg"
              src={this.props.item.itemInfo.gallery[this.state.currentImageIndex]}
            />
            {this.props.item.itemInfo.gallery.length > 1 ? (
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

            {this.props.item.itemInfo.attributes.map((attr, i) => (
              <div key={attr.id}>
                <h4>{attr.name}:</h4>
                <div className="itemAtrrs">
                  {attr.items.map((item, i) => (
                    <div key={item.id}>
                      <h2
                        className={`attrsRep ${
                          isSelected(item, attr.name) ? "attrSelected" : ""
                        }`}
                        style={{
                          backgroundColor:
                            attr.type === "swatch" ? item.value : "",
                        }}
                      >
                        {attr.type === "swatch" ? (
                          <div
                            className={`colorBox ${
                              isSelected(item, attr.name) ? "colorSelected" : ""
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
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
