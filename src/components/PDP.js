import React, { Component } from "react";
import PDPGallery from "./PDPGallery";
import Attrs from "./attrs";

class PDP extends Component {
  state = {
    initialSelection: [],
    selectedAttrs: {
      itemInfo: this.props.pdpItem,
      quantity: 1,
      attributes: [],
    },
    cart: this.props.cart,
  };

  setSelection = (id, name, value) => {
    let preSelectedAttrs = [...this.state.initialSelection.attributes];
    // console.log(preSelectedAttrs);
    // replace the value of the item in the state if it already exists
    // let selectedAttrs = this.state.selectedAttrs;
    let selectedAttrs = preSelectedAttrs;

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
    this.setState({
      selectedAttrs: {
        itemInfo: this.props.pdpItem,
        quantity: this.state.selectedAttrs.quantity,
        attributes: selectedAttrs,
      },
    });
  };

  handleSubmit = () => {
    this.props.addToCart(this.state.selectedAttrs.attributes.length === 0 ? this.state.initialSelection : this.state.selectedAttrs);
    // reset the state
    let initSelect = {
      itemInfo: this.props.pdpItem,
      quantity: 1,
      attributes: [],
    };

    this.props.pdpItem.attributes.forEach((attr) => {
      initSelect.attributes.push({
        name: attr.name,
        value: attr.items[0].value,
      });
    });
    console.log('rendered');
    this.setState({ initialSelection: initSelect });

    
  }

  componentDidMount() {
    // update state with default values
    let initSelect = {
      itemInfo: this.props.pdpItem,
      quantity: 1,
      attributes: [],
    };

    this.props.pdpItem.attributes.forEach((attr) => {
      initSelect.attributes.push({
        name: attr.name,
        value: attr.items[0].value,
      });
    });
    console.log('rendered');
    this.setState({ initialSelection: initSelect });
  }

 

  render() {
    console.log(this.state);
    // console.log(this.props.pdpItem);
    return (
      <div>
        <div>
          <button onClick={() => this.props.changeLocation("PLP")}>Back</button>
        </div>
        <div className="PDPcontainer">
          <div className="galleryContainer">
            <PDPGallery pics={this.props.pdpItem.gallery} />
          </div>
          <div>
            <Attrs
              attrs={this.props.pdpItem}
              addToCart={this.props.addToCart}
              initialSelection={this.state.initialSelection}
              isSubmitted={this.state.submitted}
              handleChangeSubmit={this.handleChangeSubmit}
              setSelection={this.setSelection}
            />
            <button onClick={() => this.handleSubmit()}>Add To Cart</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
