import { gql } from "@apollo/client";

export const VERIFY_REGISTRATION_CODE = gql`
  mutation verifyRegistrationCode($verifyRegistrationInput: VerifyRegistrationInput!) {
    verifyRegistrationCode(verifyRegistrationInput: $verifyRegistrationInput) {
      message
    }
  }
`;

export default VERIFY_REGISTRATION_CODE;
