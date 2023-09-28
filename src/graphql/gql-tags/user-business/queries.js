const { gql } = require("@apollo/client");

export const GET_USER_MANAGED_BUSINESS_TAG = gql`
  query getUserManagedBusinesses {
    getUserManagedBusinesses {
      id
      userId
      businessId
      business {
        id
        name
        image
      }
    }
  }
`;

export default GET_USER_MANAGED_BUSINESS_TAG;
