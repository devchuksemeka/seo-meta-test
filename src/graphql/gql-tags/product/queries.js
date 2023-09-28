const { gql } = require("@apollo/client");

export const GET_CREATE_PRODUCT_PRE_REQUIRED_DATA_TAG = gql`
  query getCreateProductPreRequiredData {
    sizes
    categories
    tags
    currencies
    colors
    marketplaces: getUserMarketPlaces {
      id
      name
      status
    }
  }
`;

export const GET_PRODUCTS_TAG = gql`
  query getProducts {
    getProducts {
      category
      createdAt
      id
      name
      publishedStatus
      stockStatus
    }
  }
`;

export const GET_PRODUCT_BY_ID_TAG = gql`
  query getProductById($productId: String!) {
    getProduct(id: $productId) {
      price
      category
      createdAt
      description
      id
      name
      publishedStatus
      stockStatus
      weight
      quantity
      price
      price_currency
      sku
      tags
      size
      colors
      images {
        uuid
        dataUrl
      }
      marketplaceIds
    }
    sizes
    categories
    tags
    currencies
    colors
    marketplaces: getUserMarketPlaces {
      id
      name
      status
    }
  }
`;
export default GET_CREATE_PRODUCT_PRE_REQUIRED_DATA_TAG;
