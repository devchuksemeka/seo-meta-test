import { gql } from "@apollo/client";

const REQUEST_SERVICE_GQL_TAG = gql`
  mutation requestService(
    $businessId: String!
    $date: DateTime!
    $orderSummary: OrderSummaryInputType!
  ) {
    requestService(
      requestServiceInput: {
        businessId: $businessId
        date: $date
        orderSummary: $orderSummary
      }
    ) {
      id
    }
  }
`;

export default REQUEST_SERVICE_GQL_TAG;
