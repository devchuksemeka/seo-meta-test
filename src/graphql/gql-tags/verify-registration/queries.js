import { gql } from "@apollo/client";

export const GET_VALIDATE_REGISTRATION_TOKEN = gql`
  query getValidateRegistrationToken($token: String!) {
    getValidateRegistrationToken(token: $token) {
      email
      isExpired
    }
  }
`;
export default GET_VALIDATE_REGISTRATION_TOKEN;
