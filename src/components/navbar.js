import { Component } from "react";
import CartOverlay from "./CartOverlay";
import CurrencyMenu from "./currency";
import BrandIcon from "./icons/BrandIcon.svg";

class Navbar extends Component {
  render() {
    // console.log(this.props.cartOverlayState);
    
    return (
      <div className="navbar container">
        <div className="categoriesContainer">
          {this.props.tabs.map((tab, i) => (
            
            <h4 className={` navbarTab ${tab === this.props.currentTab ? "activeTab" : ""}`} key={i} onClick={() => this.props.tabChange(tab)}>
              {tab.toUpperCase()}
            </h4>
          ))}
        </div>

        <span>
          <img className="brandIcon" src={BrandIcon} />
        </span>

        <div className="cartContainer">
          <span>
            <CurrencyMenu
              toggleCurrencyMenu={this.props.toggleCurrencyMenu}
              currencyMenuState={this.props.currencyMenuState}
              currencies={this.props.currencies}
              selectCurrency={this.props.selectCurrency}
              currency={this.props.currency}
            />
          </span>
          <span>
            <CartOverlay
              cartOverlayState={this.props.cartOverlayState}
              cartItems={this.props.cartItems}
              incrementQuantity={this.props.incrementQuantity}
              decrementQuantity={this.props.decrementQuantity}
              toggleCartOverlay={this.props.toggleCartOverlay}
              currency={this.props.currency}
              changeLocation={this.props.changeLocation}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default Navbar;
