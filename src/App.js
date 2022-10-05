import logo from "./logo.svg";
import "./App.css";
// import class component
import React, { Component } from "react";
import PLP from "./components/PLP";


class App extends Component {
  render() {
    return (
      <div>
        <PLP />
      </div>
    );
  }
}

export default App;
