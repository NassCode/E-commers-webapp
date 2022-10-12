import React, { Component } from "react";

class Attrs extends Component {
  render() {
    console.log(this.props.attrs);
    return (
      <div className="Attrs">
        <div className="Attrs__container">
          <div className="Attrs__container__img">
            <h1>{this.props.attrs.brand}</h1>
            <h1>{this.props.attrs.name}</h1>
          </div>
          <div>
            {this.props.attrs.attributes.map((attr, i) => (
              <div key={attr.id}>
                <h1>{attr.name}:</h1>
                <div className="itemAtrrs">
                  {attr.items.map((item, i) => (
                    <div key={item.id}>
                      <h1>{item.displayValue}</h1>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h1>{this.props.attrs.prices[0].__typename}:</h1>
              <h1>
                {this.props.attrs.prices[0].currency.symbol}{" "}
                {this.props.attrs.prices[0].amount}
              </h1>
            </div>
            <div>
              <button>add to cart</button>
            </div>
            <div>{this.props.attrs.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Attrs;
