import React, { Component } from "react";
import PDPGallery from "./PDPGallery";
import Attrs from "./attrs";
import back from "./icons/back.svg";

class PDP extends Component {
  state = {
    initialSelection: [],
    selectedAttrs: {
      itemInfo: this.props.pdpItem,
      quantity: 1,
      attributes: [],
    },
    cart: this.props.cart,
    currentImageIndex: 0,
  };

  imageSwitch = (direction) => {
    let { currentImageIndex } = this.state;
    let { gallery } = this.props.pdpItem;
    if (direction === "next") {
      if (currentImageIndex === gallery.length - 1) {
        this.setState({ currentImageIndex: 0 });
      } else {
        this.setState({ currentImageIndex: currentImageIndex + 1 });
      }
    } else if (direction === "prev") {
      if (currentImageIndex === 0) {
        this.setState({ currentImageIndex: gallery.length - 1 });
      } else {
        this.setState({ currentImageIndex: currentImageIndex - 1 });
      }
    }
  };

  setSelection = (id, name, value, type, displayValue) => {
    let preSelectedAttrs = [...this.state.initialSelection.attributes];
    // replace the value of the item in the state if it already exists
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
      selectedAttrs.push({
        id: id,
        name: name,
        value: value,
        type: type,
        displayValue: displayValue,
      });
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
    this.props.addToCart(
      this.state.selectedAttrs.attributes.length === 0
        ? this.state.initialSelection
        : this.state.selectedAttrs
    );
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
        displayValue: attr.items[0].displayValue,
        type: attr.type,
      });
    });

    // console.log(this.state.selectedAttrs.attributes);
    let newAttrs = JSON.parse(
      JSON.stringify(this.state.selectedAttrs.attributes)
    );

    if (this.state.selectedAttrs.attributes.length !== 0) {
      // console.log(newAttrs);
      initSelect.attributes = newAttrs;
      this.setState({ initialSelection: initSelect });
    } else {
      let defaulClick = {
        itemInfo: this.props.pdpItem,
        quantity: 1,
        attributes: [],
      };

      defaulClick.attributes = newAttrs;

      // console.log('rendered');
      this.setState({
        initialSelection: initSelect,
        selectedAttrs: defaulClick,
      });
    }
  };

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
        displayValue: attr.items[0].displayValue,
        type: attr.type,
      });
    });
    // console.log('rendered');
    this.setState({ initialSelection: initSelect });
  }

  render() {
    return (
      <div>
        <div className="pdpcontainerT">
          <div className="backbutton">
            <img
              className="backsvg"
              onClick={() => this.props.changeLocation("PLP")}
              src={back}
              alt="back"
            />
          </div>
          <div className="PDPcontainer">
            {
              this.props.screen > 760 ? (
                <div className="galleryContainer">
                  <PDPGallery pics={this.props.pdpItem.gallery} />
                </div>
              ) : (
                <div className="pdpMimageContainer">
              <img
                className="pdpMminiImage"
                src={
                  this.props.pdpItem.gallery[this.state.currentImageIndex]
                }
              />
              {this.props.pdpItem.gallery.length > 1 ? (
                <div className="miniCartImgNav">
                  <div>
                    <button
                      onClick={() => this.imageSwitch("prev")}
                      className="miniCartImgNavBtn"
                    >
                      {"<"}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => this.imageSwitch("next")}
                      className="miniCartImgNavBtn"
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
              )
            }
            
            <div>
              <Attrs
                attrs={this.props.pdpItem}
                addToCart={this.props.addToCart}
                initialSelection={this.state.initialSelection}
                selectedAttrs={this.state.selectedAttrs.attributes}
                isSubmitted={this.state.submitted}
                handleChangeSubmit={this.handleChangeSubmit}
                setSelection={this.setSelection}
                handleSubmit={this.handleSubmit}
                currency={this.props.currency}
              />
            </div>

            
            
          </div>
        </div>
        <div
          className={`${
            this.props.cartOverlayState === true &&
            this.props.location === "PDP"
              ? "overcast"
              : ""
          }`}
        >
          <p></p>
        </div>
      </div>
    );
  }
}

export default PDP;
