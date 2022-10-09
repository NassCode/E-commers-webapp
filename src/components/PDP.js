import React, { Component } from "react";
import PDPGallery from "./PDPGallery";
import Attrs from "./attrs";

class PDP extends Component {
  render() {
    return (
      <div className="PDPcontainer">
        <div className="App"></div>
        <button onClick={() => this.props.changeLocation("PLP")}>Back</button>
        <div>
          <h1>{this.props.pdpItem.id}</h1>

          <PDPGallery pics={this.props.pdpItem.gallery} />

          <Attrs attrs={this.props.pdpItem} />
        </div>
      </div>
    );
  }
}

export default PDP;
