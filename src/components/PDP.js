import React, { Component } from "react";
import PDPGallery from "./PDPGallery";
import Attrs from "./attrs";

class PDP extends Component {
  state = {
    initialSelection: [],
    itemAttrs: []
  }

  componentDidMount() {
    // update state with default values
    let initSelect = [];
    this.props.pdpItem.attributes.forEach((attr) => {
      initSelect.push({id: attr.id, name: attr.name, value: attr.items[0].value})

      // this.setState({initialSelection: [...this.state.initialSelection, {id: attr.id, name: attr.name, value: attr.items[0].value}]})
      // this.props.setAttrs(attr.id, attr.items[0].id, attr.items[0].value);
      // console.log(attr)
      // attr.items.map((item) => {
      //   // console.log(item)
      // })
      // this.setState({ initialSelection: [...this.state.initialSelection, { id: attr.id, name: attr.name, value: attr.items[0].value }] })
    })
    this.setState({initialSelection: initSelect});
  }


  render() {
    console.log(this.state)
    console.log(this.props.pdpItem)
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
                  
                   addToCart={this.props.addToCart} />
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
