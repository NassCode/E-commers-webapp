import { Component } from "react";
import CartOverlay from "./CartOverlay";


class Navbar extends Component {



  render() {
    console.log(this.props)

    return (
      <div className="navbar container">
        <div className="categoriesContainer">
          
          <span>All</span>

          <span>Clothes</span>

          <span>Tech</span>

        </div>

        <span>\__LOGO__/</span>

        <div className="cartContainer">
          <span>$</span>
          <CartOverlay />
        </div>

      </div>
    )
  }
}


export default Navbar;