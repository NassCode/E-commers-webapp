import React, { Component } from "react";
import PDPGallery from "./PDPGallery";
import Attrs from "./attrs";

class PDP extends Component {
  state = {
    initialSelection: [],
    itemAttrs: [],
  };

  componentDidMount() {
    // update state with default values
    let initSelect = [];
    this.props.pdpItem.attributes.forEach((attr) => {
      initSelect.push({
        id: this.props.pdpItem.id,
        name: attr.name,
        value: attr.items[0].value,
      });
    });
    this.setState({ initialSelection: initSelect });
  }

  render() {
    // console.log(this.state);
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
