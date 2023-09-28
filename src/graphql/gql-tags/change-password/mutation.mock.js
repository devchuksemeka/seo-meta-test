import { CHANGE_PASSWORD_TAG } from "./mutation";

export const changePasswordMockVariables = {
  password: "chuks21375",
  repeatPassword: "chuks21375",
};

export const changePasswordMock = {
  request: {
    query: CHANGE_PASSWORD_TAG,
    variables: changePasswordMockVariables,
  },
  result: {
    data: {
      changePassword: {
        message: "Password Changed Successful",
      },
    },
  },
};

export default changePasswordMock;
