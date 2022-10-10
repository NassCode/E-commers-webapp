import React, { Component } from "react";
import PDPGallery from "./PDPGallery";
import Attrs from "./attrs";

class PDP extends Component {
  render() {
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
            <Attrs attrs={this.props.pdpItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
