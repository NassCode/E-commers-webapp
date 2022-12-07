import React from "react";
import { client } from "../index";
import { CURRENCIES } from "../GraphQL/Queries";
import collabs from "./icons/collabs.svg";
import dropdown from "./icons/dropdown.svg";

class CurrencyMenu extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.iconRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  // detect click outside of currency menu
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, true);
    document.addEventListener("mousedown", this.handleIconClick, true);
  }

  handleClickOutside(event) {
    if (
      this.ref.current &&
      !this.ref.current.contains(event.target) &&
      event.target.accessKey !== "currencyKey"
    ) {
      // console.log("clicked outside and $ is pressed");
      this.props.toggleCurrencyMenu();
    } else if (
      this.ref.current &&
      !this.ref.current.contains(event.target) &&
      event.target.accessKey === "currencyKey"
    ) {
      // console.log("clicked outside");
      // this.props.toggleCurrencyMenu();
      return;
    }
  }

  handleIconClick = (event) => {
    if (this.iconRef.current && this.iconRef.current.contains(event.target)) {
      // console.log("clicked currency");
      this.props.toggleCurrencyMenu();
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <div className="currencyIcon">
          <h3 ref={this.iconRef} accessKey="currencyKey">
            {this.props.currency.symbol}
          </h3>

          <img
            src={`${
              this.props.currencyMenuState === false ? dropdown : collabs
            }`}
          />
        </div>
        {this.props.currencyMenuState === false ? null : (
          <div className="currencyMenu" ref={this.ref}>
            {this.props.currencies.length === 0 ? null : (
              <div>
                {this.props.currencies.map((currency, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => this.props.selectCurrency(currency)}
                    >
                      <h3>
                        {currency.symbol} {currency.label}
                      </h3>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default CurrencyMenu;
