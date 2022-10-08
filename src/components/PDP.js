import React, { Component } from "react";

class PDP extends Component {
  render() {
    console.log(this.props.pdpItem);

    return (
      <div className="App">
        <h1>{this.props.pdpItem.id}</h1>
      </div>
    );
  }
}

export default PDP;
