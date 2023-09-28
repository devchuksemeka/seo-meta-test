import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE_TAG = gql`
  mutation updateUserProfile($phone: String!, $address: String!) {
    updateUserProfile(phone: $phone, address: $address) {
      # status
      message
    }
  }
`;
