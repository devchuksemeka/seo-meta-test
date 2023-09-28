import { gql } from "@apollo/client";

export const CHANGE_PASSWORD_TAG = gql`
  mutation changePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput) {
      message
    }
  }
`;

export default CHANGE_PASSWORD_TAG;
