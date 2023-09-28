import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation resetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput) {
      message
    }
  }
`;

export default RESET_PASSWORD;
