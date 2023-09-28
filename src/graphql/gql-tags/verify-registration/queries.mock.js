import { GET_VALIDATE_REGISTRATION_TOKEN } from "./queries";

export const registrationToken =
  "BHGHDGYTE84923727UIEGGHDOW3823234RNSJKDJHJSRKHDS2324232GGHG4290884242DGFHS";
export const registrationEmail = "chuks@carojon.com";
export const getValidateRegistrationToken = {
  request: {
    query: GET_VALIDATE_REGISTRATION_TOKEN,
    variables: {
      token: registrationToken,
    },
  },
  result: {
    data: {
      getValidateRegistrationToken: {
        email: registrationEmail,
        isExpired: false,
      },
    },
  },
};

export default getValidateRegistrationToken;
