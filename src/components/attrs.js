import React, { Component } from "react";

class Attrs extends Component {
  state = {
    itemInfo: this.props.attrs,
    quantity: 1,
    attributes: []
  };

  
  

  

  // setAttrs = (id, name, value) => {
  //   let preSelectedAttrs = [...this.props.initialSelection.attributes];
  //   // console.log(preSelectedAttrs);
  //   // replace the value of the item in the state if it already exists
  //   // let selectedAttrs = this.state.selectedAttrs;
  //   let selectedAttrs = preSelectedAttrs;

  //   let itemExists = false;
  //   selectedAttrs.forEach((item, i) => {
  //     if (item.name === name) {
  //       selectedAttrs[i].value = value;
  //       itemExists = true;
  //     }
  //   });
  //   // if the item doesn't exist, add it to the state
  //   if (!itemExists) {
  //     selectedAttrs.push({ id: id, name: name, value: value });
  //   }
  //   this.setState({ attributes: selectedAttrs });
  // };

  // handleSubmit = (e) => {
  //   console.log(this.state);
  //   this.props.addToCart(this.state.attributes.length === 0 ? this.props.initialSelection : this.state);
  //   this.props.handleChangeSubmit();
  // }

  render() {
    // console.log(this.props);
    // console.log(this.state);
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
                      <h1
                        onClick={() =>
                          this.props.setSelection(
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
              {/* <button
                onClick={() => this.handleSubmit()}
                        
              
              >
                add to cart
              </button> */}
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
