import React, {Component} from "react";

class PDPGallery extends Component {
  state = {
    currentPic: 0
  }

  setCurrentPic = (i) => {
    this.setState({currentPic: i})
  }


  render() {
    console.log(this.props.pics);
    return (
      <div className="PDPgallery">
        <div className="galleryImagesContainer">
          {this.props.pics.map((pic, i) => (
            <img src={pic} alt="" key={i} onClick={() => this.setCurrentPic(i)}/>
          ))}
          
        </div>
        <div>
          <img src={this.props.pics[this.state.currentPic]} alt="" />
        </div>
        
      </div>
    );
  }
}

export default PDPGallery;