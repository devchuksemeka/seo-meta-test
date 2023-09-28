const { gql } = require("@apollo/client");

export const SIGN_UP_TAG = gql`
  mutation signUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      message
    }
  }
`;

export default SIGN_UP_TAG;
