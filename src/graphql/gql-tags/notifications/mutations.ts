import { gql } from "@apollo/client";

const MARK_ALL_AS_READ_GQL_TAG = gql`
  mutation markAllAsRead {
    markAllAsRead {
      message
    }
  }
`;

export default MARK_ALL_AS_READ_GQL_TAG;
