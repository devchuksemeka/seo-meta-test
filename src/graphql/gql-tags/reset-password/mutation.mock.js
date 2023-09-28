import { RESET_PASSWORD } from "./mutation";

const email = "chuks@carojon.com";

export const resetPasswordMockVariables = {
  email,
};

export const resetPasswordMock = {
  request: {
    query: RESET_PASSWORD,
    variables: resetPasswordMockVariables,
  },
  result: {
    data: {
      resetPassword: {
        message: "Reset password token sent to email",
      },
    },
  },
};

export default resetPasswordMock;
