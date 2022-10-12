import React, { Component } from "react";

class PDPGallery extends Component {
  state = {
    currentPic: 0,
  };

  setCurrentPic = (i) => {
    this.setState({ currentPic: i });
  };

  render() {
    return (
      <div className="PDPgallery">
        {this.props.pics.length > 1 ? (
          <div className="PDPgallery">
            <div className="galleryImagesContainer">
              {this.props.pics.map((pic, i) => (
                <img
                  className="galleryImage"
                  src={pic}
                  alt=""
                  key={i}
                  onClick={() => this.setCurrentPic(i)}
                />
              ))}
            </div>
            <div>
              <img
                className="PDPimage"
                src={this.props.pics[this.state.currentPic]}
                alt=""
              />
            </div>
          </div>
        ) : (
          <div>
            <img
              className="PDPimage"
              src={this.props.pics[this.state.currentPic]}
              alt=""
            />
          </div>
        )}
      </div>
    );
  }
}

export default PDPGallery;
