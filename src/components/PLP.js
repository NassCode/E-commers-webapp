import React, { Component } from "react";
import Item from "./Item";

export default class PLP extends Component {
  render() {
    // clean this up

    const { categories } = this.props;

    return (
      <div>
        <h1>Categories</h1>

        {this.props.currentTab === "All" && (
          <div className="PLPcontainer">
            {categories[0].products.map((product, i) => (
              <Item
                key={i}
                productProps={product}
                selectPDPItem={this.props.selectPDPItem}
              />
            ))}
          </div>
        )}

        {this.props.currentTab === "Clothes" && (
          <div className="PLPcontainer">
            {categories[1].products.map((product, i) => (
              <Item
                key={i}
                productProps={product}
                selectPDPItem={this.props.selectPDPItem}
              />
            ))}
          </div>
        )}

        {this.props.currentTab === "Tech" && (
          <div className="PLPcontainer">
            {categories[2].products.map((product, i) => (
              <Item
                key={i}
                productProps={product}
                selectPDPItem={this.props.selectPDPItem}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
