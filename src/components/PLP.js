import React, { Component } from "react";
import { client } from "../index";
import { CATEGORIES } from "../GraphQL/Queries";

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
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        <h1>Categories</h1>
        
       
      </div>
    );
  }
}