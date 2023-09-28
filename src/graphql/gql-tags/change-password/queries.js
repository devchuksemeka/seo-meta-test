import { gql } from "@apollo/client";

export const GET_VALIDATE_CHANGE_PASSWORD_TOKEN = gql`
  query getValidateChangePasswordToken($token: String) {
    getValidateChangePasswordToken(token: $token) {
      email
    }
  }
`;
export default GET_VALIDATE_CHANGE_PASSWORD_TOKEN;
