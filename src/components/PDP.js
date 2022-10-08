import React, { Component } from "react";

class PDP extends Component {
  render() {
    console.log(this.props.pdpItem);

    return (
      <div className="PDPcontainer">
        <div className="App"></div>
          <button onClick={() => this.props.changeLocation('PLP')}>Back</button>
        <div>
          <h1>{this.props.pdpItem.id}</h1>
        </div>
      </div>
    );
  }
}

export default PDP;
