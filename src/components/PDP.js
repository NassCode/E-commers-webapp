import React, { Component } from "react";
import PDPGallery from "./PDPGallery";
import Attrs from "./attrs";

class PDP extends Component {
  state = {
    stateToSubmit: []

  }

  setAttrs = (item, id, value) => {
    // replace the value of the item in the state if it already exists
    let stateToSubmit = this.state.stateToSubmit;
    let itemExists = false;
    stateToSubmit.forEach((item, i) => {
      if (item.id === id) {
        stateToSubmit[i].value = value;
        itemExists = true;
      }
    });
    // if the item doesn't exist, add it to the state
    if (!itemExists) {
      stateToSubmit.push({[item]: {id: id, value: value }});
    }
    this.setState({ stateToSubmit: stateToSubmit });
  };

  render() {
    console.log(this.state)
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
            <Attrs attrs={this.props.pdpItem} 
                   setAttrs={this.setAttrs}
                   stateToSubmit={this.state.stateToSubmit}
                   addToCart={this.props.addToCart} />
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
