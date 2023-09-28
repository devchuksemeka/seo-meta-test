import { gql } from "@apollo/client";

export const REVIEW_BUSINESS_GQL_TAG = gql`
  mutation reviewBusiness(
    $rating: Float!
    $message: String!
    $businessId: String!
    $requestId: String!
  ) {
    reviewBusiness(
      reviewBusinessInput: {
        rating: $rating
        message: $message
        businessId: $businessId
        requestId: $requestId
      }
    ) {
      id
      businessId
      requestId
      rating
      message
    }
  }
`;
