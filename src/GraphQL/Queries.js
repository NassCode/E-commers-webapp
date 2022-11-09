import { gql } from "@apollo/client";

export const CATEGORIES = gql`
query {
  categories{
    name
    products {
      id
    name
    inStock
    gallery
    description
    category
    attributes{
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices{
      currency{
        label
        symbol
      }
      amount
    }
  
    brand
    }
  }
  currencies {
    label
    symbol
  }
}
`;

export const CURRENCIES = gql`
query {
  currencies {
    label
    symbol
  }
}
`;