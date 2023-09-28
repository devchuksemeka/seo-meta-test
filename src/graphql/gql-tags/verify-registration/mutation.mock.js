import { VERIFY_REGISTRATION_CODE } from "./mutation";

const email = "chuks@carojon.com";
const code = "1234567";

export const verifyRegistrationMockVariables = {
  email,
  code,
};

export const verifyRegistrationCodeMock = {
  request: {
    query: VERIFY_REGISTRATION_CODE,
    variables: verifyRegistrationMockVariables,
  },
  result: {
    data: {
      verifyRegistrationCode: {
        message: "Email Verification Successful",
      },
    },
  },
};

export default verifyRegistrationCodeMock;
