import logo from "./logo.svg";
import "./App.css";
// import class component
import React, { Component } from "react";
import PLP from "./components/PLP";
import Navbar from "./components/navbar";
import { client } from "./index";
import { CATEGORIES } from "./GraphQL/Queries";
import PDP from "./components/PDP";

class App extends Component {
  state = {
    categories: [],
    currentTab: "All",
    location: "PLP",
    currency: "USD",
    pdpItem: {},
  };

  componentDidMount() {
    client
      .query({
        query: CATEGORIES,
      })
      .then((result) => {
        this.setState({
          categories: result.data.categories,
        });
      });
  }

  tabChange = (tab) => {
    this.setState({ currentTab: tab,
                    location: "PLP" });
  };

  changeLocation = (location) => {
    this.setState({ location: location });
  };

  changeCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  changePDPItem = (item, location) => {
    this.setState({ pdpItem: item, location: location });
  };

  render() {
    return (
      <div>
        <div>
          <Navbar
            tabChange={this.tabChange}
            currentTab={this.state.currentTab}
          />
        </div>
        <div>
          {
            this.state.categories.length === 0 && <div>Loading...</div>
            // implement loading screen
            // implement what component to render based on state
          }
        </div>
        <div>
          {this.state.location === "PLP" &&
          this.state.categories.length !== 0 ? (
            <PLP
              categories={this.state.categories}
              currentTab={this.state.currentTab}
              changeLocation={this.changeLocation}
              changePDPItem={this.changePDPItem}
            />
          ) : null}

          {this.state.location === "PDP" &&
          this.state.categories.length !== 0 ? (
            <PDP pdpItem={this.state.pdpItem} 
                 changeLocation={this.changeLocation}/>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
