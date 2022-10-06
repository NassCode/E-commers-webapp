import React, { Component } from "react";
import { client } from "../index";
import { CATEGORIES } from "../GraphQL/Queries";
import Item from "./Item";

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
          categories: result.data.categories[0].products,
        });
      });
  }

  render() {
    if (this.state.categories.length === 0) {
      return <div>Loading...</div>;
    }
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        <h1>Categories</h1>
        <div className="PLPcontainer">
          {categories.map((product) => (
            <Item productProps={product} />
          ))}
        </div>
      </div>
    );
  }
}
