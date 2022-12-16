import React from "react";
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
      this.props.toggleCurrencyMenu();
    } else if (
      this.ref.current &&
      !this.ref.current.contains(event.target) &&
      event.target.accessKey === "currencyKey"
    ) {
      return;
    }
  }

  handleIconClick = (event) => {
    if (this.iconRef.current && this.iconRef.current.contains(event.target)) {
      this.props.toggleCurrencyMenu();
    }
  };

  render() {
    return (
      <div>
        <div className="currencyIcon">
          <h3 ref={this.iconRef} accessKey="currencyKey">
            {this.props.currency.symbol}{" "}
            <img
              src={`${
                this.props.currencyMenuState === false ? dropdown : collabs
              }`}
              alt="currency icon"
            />
          </h3>
        </div>
        {this.props.currencyMenuState === false ? null : (
          <div className="currencyMenu" ref={this.ref}>
            {this.props.currencies.length === 0 ? null : (
              <div>
                {this.props.currencies.map((currency, i) => {
                  return (
                    <div
                      className="currencyItem"
                      key={i}
                      onClick={() => this.props.selectCurrency(currency)}
                    >
                      <div className="currencyRep">
                        {currency.symbol} {currency.label}
                      </div>
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
