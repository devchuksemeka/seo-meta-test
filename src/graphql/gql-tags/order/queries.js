const { gql } = require("@apollo/client");

// export const GET_ORDERS_TAG = gql`
//   query getOrders {
//     getOrders {
//       product {
//         id
//         name
//       }
//       marketplace {
//         name
//       }
//       date
//       id
//       revenue
//       status
//     }
//   }
// `;

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
      review {
        id
        businessId
        requestId
        rating
        message
      }
      date
      status
      amount
    }
  }
`;

// export default GET_ORDERS_TAG;
