import React, { Component } from "react";

class Attrs extends Component {
  state = {
    selectedAttrs: [],
  };

  setAttrs = (id, name, value) => {
    // replace the value of the item in the state if it already exists
    let selectedAttrs = this.state.selectedAttrs;
    let itemExists = false;
    selectedAttrs.forEach((item, i) => {
      if (item.name === name) {
        selectedAttrs[i].value = value;
        itemExists = true;
      }
    });
    // if the item doesn't exist, add it to the state
    if (!itemExists) {
      selectedAttrs.push({ id: id, name: name, value: value });
    }
    this.setState({ selectedAttrs: selectedAttrs });
  };

  // componentDidMount() {
  //   // update state with default values
  //   this.props.attrs.attributes.forEach((attr) => {
  //     this.props.setAttrs(attr.id, attr.items[0].id, attr.items[0].value);
  //   });
  // }

  render() {
    console.log(this.state);
    return (
      <div className="Attrs">
        <div className="Attrs__container">
          <div className="Attrs__container__img">
            <h1>{this.props.attrs.brand}</h1>
            <h1>{this.props.attrs.name}</h1>
          </div>
          <div>
            {/* {this.props.attrs.attributes.map((attr, i) => (
              <div key={attr.id}>
                <h1>{attr.name}:</h1>
                <div className="itemAtrrs">
                  {attr.items.map((item, i) => (
                    <div key={item.id}>
                      <h1 onClick={() => this.props.setAttrs(this.props.attrs.id, attr.name, item.value)}>
                        {item.displayValue}
                        </h1>
                    </div>
                  ))}
                </div>
              </div>
            ))} */}

            {this.props.attrs.attributes.map((attr, i) => (
              <div key={attr.id}>
                <h1>{attr.name}:</h1>
                <div className="itemAtrrs">
                  {attr.items.map((item, i) => (
                    <div key={item.id}>
                      <h1
                        onClick={() =>
                          this.setAttrs(
                            this.props.attrs.id,
                            attr.name,
                            item.value
                          )
                        }
                      >
                        {item.displayValue}
                      </h1>
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
              <button
                onClick={() => this.props.addToCart(this.state.selectedAttrs)}
              >
                add to cart
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: this.props.attrs.description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Attrs;
