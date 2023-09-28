const { gql } = require("@apollo/client");

const SIGN_IN_TAG = gql`
  mutation signIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      message
      accessToken
    }
  }
`;
export const GOOGLE_NEXT_AUTH_SIGN_IN_GQL_TAG = gql`
  mutation googlePostNextAuthSignIn(
    $googlePostNextAuthSignInInput: GooglePostNextAuthSignInInput!
  ) {
    googlePostNextAuthSignIn(
      googlePostNextAuthSignInInput: $googlePostNextAuthSignInInput
    ) {
      message
    }
  }
`;

export const GOOGLE_NEXT_AUTH_SIGN_IN_STRING_TAG = `
  mutation googlePostNextAuthSignIn(
    $googlePostNextAuthSignInInput: GooglePostNextAuthSignInInput!
  ) {
    googlePostNextAuthSignIn(
      googlePostNextAuthSignInInput: $googlePostNextAuthSignInInput
    ) {
      message
    }
  }
`;

export default SIGN_IN_TAG;
