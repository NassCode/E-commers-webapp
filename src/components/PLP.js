import React, { Component } from "react";
import Item from "./Item";

export default class PLP extends Component {
  render() {
    // clean this up

    const { categories } = this.props;
    let category = categories.find(
      (category) => category.name === this.props.currentTab
    );

    // console.log(this.props);

    return (
      <div>
        <div className="PLPcontainer">
          {category.products.map((product, i) => (
            <Item
              key={i}
              productProps={product}
              selectPDPItem={this.props.selectPDPItem}
              currency={this.props.currency}
              addToCart={this.props.addToCart}
            />
          ))}
          
            <div className={`${this.props.cartOverlayState === true && this.props.location === "PLP" ? "overcast" : ""}`}>
              <p></p>
            </div>
          
        </div>
      </div>
    );
  }
}
