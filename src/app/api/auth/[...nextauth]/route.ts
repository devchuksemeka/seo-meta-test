import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  callbacks: {
    async jwt(data) {
      const { token, account, profile, trigger } = data ?? {};
      if (profile) {
        token.profile = profile;
      }
      return token;
    },
    async session(data) {
      const { session, token } = data;
      const newSession = session as any;
      // Send properties to the client, like an access_token from a provider.
      newSession.accessToken = token.accessToken;
      newSession.token = token.accessToken;
      newSession.user.image = token.image;
      newSession.user.id = token.id;
      return newSession;
    },
    async signIn({ profile }) {
      // const {
      //   email,
      //   email_verified,
      //   given_name: firstname,
      //   family_name: lastname,
      //   picture,
      // } = profile as any;
      try {
        // await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     query: `
        //       mutation googlePostNextAuthSignIn(
        //         $googlePostNextAuthSignInInput: GooglePostNextAuthSignInInput!
        //       ) {
        //         googlePostNextAuthSignIn(
        //           googlePostNextAuthSignInInput: $googlePostNextAuthSignInInput
        //         ) {
        //           message
        //         }
        //       }
        //     `,
        //     variables: {
        //       googlePostNextAuthSignInInput: {
        //         email,
        //         firstname,
        //         lastname,
        //         profileUrl: picture,
        //         emailVerified: email_verified,
        //       },
        //     },
        //   }),
        // });
        return true;
      } catch (error) {
        console.log("signIn_error", JSON.stringify(error, null, 2));
        return false;
      }
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encode: async (data: any) => {
      const { secret, token } = data;

      const { email, name, id, image, profile } = token;

      const newProfile = profile as any;

      let newId = id;
      let newImage = image;
      if (profile) {
        const {
          email_verified,
          given_name: firstname,
          family_name: lastname,
          picture,
        } = newProfile;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
              mutation googlePostNextAuthSignIn(
                $googlePostNextAuthSignInInput: GooglePostNextAuthSignInInput!
              ) {
                googlePostNextAuthSignIn(
                  googlePostNextAuthSignInInput: $googlePostNextAuthSignInInput
                ) {
                  id
                }
              }
            `,
              variables: {
                googlePostNextAuthSignInInput: {
                  email,
                  firstname,
                  lastname,
                  profileUrl: picture,
                  emailVerified: email_verified,
                },
              },
            }),
          }
        );
        const responseData = await response.json();
        newId = responseData?.data?.googlePostNextAuthSignIn?.id;
        newImage = profile.picture;
      }

      const jwtClaims = {
        name,
        email,
        image: newImage,
        app: "nextAuth+carojon_search",
        id: newId,
      };

      const encodedToken = jwt.sign(jwtClaims, secret, {
        expiresIn: "1h",
        algorithm: "HS512",
      });
      return encodedToken;
    },
    async decode(data: any) {
      const { secret, token, maxAge } = data;
      let verify = jwt.verify(token, secret) as JWT;
      // make it available for the callback and to also store in the session storage
      verify.accessToken = token;

      return verify;
    },
  },
});

export { handler as GET, handler as POST };
