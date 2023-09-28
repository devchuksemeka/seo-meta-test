import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS_GQL = gql`
  query getNotifications {
    getNotifications {
      id
      message
      isRead
      category
      noticeType
      createdAt
      payload {
        entity {
          id
        }
        requester {
          name
          imageUrl
        }
        recipient {
          name
          imageUrl
        }
      }
    }
  }
`;

export const READ_NOTIFICATION_GQL_TAG = gql`
  query readNotification($id: String!) {
    readNotification(id: $id) {
      message
    }
  }
`;

// export const GET_NOTIFICATION_GQL = gql`
//   query getNotification($id: String!) {
//     getNotification(id: $id) {
//       id
//       message
//       isRead
//       category
//       noticeType
//       createdAt
//       payload {
//         entity {
//           id
//         }
//       }
//     }
//   }
// `;

export default GET_NOTIFICATIONS_GQL;
