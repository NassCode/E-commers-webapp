import React, { Component } from "react";
import PDPGallery from "./PDPGallery";


class PDP extends Component {
  render() {
    console.log(this.props.pdpItem);

    return (
      <div className="PDPcontainer">
        <div className="App"></div>
          <button onClick={() => this.props.changeLocation('PLP')}>Back</button>
        <div>
          <h1>{this.props.pdpItem.id}</h1>
          <PDPGallery pics={this.props.pdpItem.gallery} />
        </div>
      </div>
    );
  }
}

export default PDP;
