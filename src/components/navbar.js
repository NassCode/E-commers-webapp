import { Component } from "react";
import CartOverlay from "./CartOverlay";


class Navbar extends Component {



  render() {
    
    return (
      <div className="navbar container">
        <div className="categoriesContainer">
          
          <span onClick={() => this.props.tabChange('All')}>All</span>

          <span onClick={() => this.props.tabChange('Clothes')}>Clothes</span>

          <span onClick={() => this.props.tabChange('Tech')}>Tech</span>

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