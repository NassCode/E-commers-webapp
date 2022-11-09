import React from "react";
import { client } from "../index";
import { CURRENCIES } from "../GraphQL/Queries";


class CurrencyMenu extends React.Component {
  

  render() {
    console.log(this.props.currencies);
    return (
      <div className="currencyMenu">
        <h3 onClick={() => this.props.toggleCurrencyMenu()}>$</h3>
        {this.props.currencyMenuState === false ? null : 
          <div>
            {this.props.currencies.length === 0 ? null : (
              <div>
                {this.props.currencies.map((currency, i) => {
                  return (
                    <div key={i} onClick={() => this.props.selectCurrency(currency)}>
                   
                      <h3>{currency.symbol}</h3>
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