import React, {Component} from "react";

class PDPGallery extends Component {
  render() {
    console.log(this.props.pics);
    return (
      <div className="PDPgalary">
        <div className="PDPgalary__container">
          <div className="PDPgalary__container__img">
            <img src={this.props.pics[0]} />
          </div>
        </div>
      </div>
    );
  }
}

export default PDPGallery;