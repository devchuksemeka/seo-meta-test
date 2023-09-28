const { gql } = require("@apollo/client");

export const GET_USER_PROFILE_TAG = gql`
  query getUserProfile {
    getUserProfile {
      id
      email
      firstname
      lastname
      phone
      address
      profileUrl
      role
    }
  }
`;
