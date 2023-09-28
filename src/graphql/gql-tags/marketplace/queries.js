const { gql } = require("@apollo/client");

const GET_MARKETPLACES = gql`
  query getUserMarketPlaces {
    getUserMarketPlaces {
      id
      image
      name
      description
      status
    }
  }
`;

export { GET_MARKETPLACES };

export default GET_MARKETPLACES;
