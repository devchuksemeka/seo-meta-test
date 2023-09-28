import { GET_VALIDATE_CHANGE_PASSWORD_TOKEN } from "./queries";

export const changePasswordToken =
  "BHGHDGYTE84923727UIEGGHDOW3823234RNSJKDJHJSRKHDS2324232GGHG4290884242DGFHS";
export const changePasswordEmail = "chuks@carojon.com";
export const getValidateChangePasswordTokenMock = {
  request: {
    query: GET_VALIDATE_CHANGE_PASSWORD_TOKEN,
    variables: {
      token: changePasswordToken,
    },
  },
  result: {
    data: {
      getValidateChangePasswordToken: {
        email: changePasswordEmail,
      },
    },
  },
};

export default getValidateChangePasswordTokenMock;
