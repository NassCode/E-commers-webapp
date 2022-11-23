import React from "react";
import { client } from "../index";
import { CURRENCIES } from "../GraphQL/Queries";


class CurrencyMenu extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  

  
  // detect click outside of currency menu
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.toggleCurrencyMenu();
    }
  };

  

  render() {
    // console.log(this.props.currencies);
    return (
      <div className="currencyMenu">
        <h3 onClick={() => this.props.toggleCurrencyMenu()}>$</h3>
        {this.props.currencyMenuState === false ? null : 
          <div ref={this.ref}>
            {this.props.currencies.length === 0 ? null : (
              <div>
                {this.props.currencies.map((currency, i) => {
                  return (
                    <div key={i} onClick={() => this.props.selectCurrency(currency)}>
                   
                      <h3>{currency.symbol} {currency.label}</h3>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}

export default CurrencyMenu;