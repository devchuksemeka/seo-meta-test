import { SIGN_UP_TAG } from "./mutation";

const email = "chuks@carojon.com";
const password = "test_password";
const firstName = "Chuks";
const lastName = "Okafor";

export const signUpMock = {
  request: {
    query: SIGN_UP_TAG,
    variables: {
      email,
      password,
      firstName,
      lastName,
    },
  },
  result: {
    data: {
      signUp: {
        message: "Sign Up Successful",
      },
    },
  },
};

export default signUpMock;
