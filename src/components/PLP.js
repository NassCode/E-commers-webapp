import React, { Component } from "react";
import { client } from "../index";
import { CATEGORIES } from "../GraphQL/Queries";
import Item from "./Item";
import Navbar from "./navbar";


export default class PLP extends Component {
  state = {
    categories: [],
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

  render() {
    if (this.state.categories.length === 0) {
      return (
        <div>
          <div>
            <Navbar />
          </div>
          <div>Loading...</div>
      </div>
      )
    }
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <h1>Categories</h1>
        <div className="PLPcontainer">
          {categories[0].products.map((product, i) => (
            <Item key={i} productProps={product} />
          ))}
        </div>
      </div>
    );
  }
}
