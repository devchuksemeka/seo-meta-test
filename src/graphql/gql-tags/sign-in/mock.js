const { default: SIGN_IN_TAG } = require("./mutation");

const email = "chuks@carojon.com";
const password = "test_password";

const signInMock = {
  request: {
    query: SIGN_IN_TAG,
    variables: {
      email,
      password,
    },
  },
  result: {
    data: {
      signIn: {
        message: "Sign In Successfu;",
        accessToken: "somerandomlongstirngsomerandomlongstirngsomerandomlongstirng",
      },
    },
  },
};

export { signInMock };

export default signInMock;
