const { gql } = require("@apollo/client");

export const GET_BUSINESS_REVIEWS_GQL = gql`
  query getBusinessReviews($id: String!) {
    getBusinessReviews(id: $id) {
      rating
      reviews {
        id
        rating
        message
        requestId
      }
    }
  }
`;

export const GET_REQUEST_BY_ID_TAG = gql`
  query getRequest($id: String!) {
    getRequest(id: $id) {
      id
      business {
        id
        email
        image
        name
        phone
        services
      }
      requester {
        id
        email
        firstname
        lastname
        phone
        profileUrl
      }
      date
      status
      amount
    }
  }
`;
