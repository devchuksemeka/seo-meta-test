"use client";
// ^ this file needs the "use client" pragma

import Loading from "@/components/atoms/Loading";
import { ApolloLink, HttpLink, SuspenseCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";

const GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? "";

// have a function to create a client for you
function makeClient(data: { token?: string }) {
  const { token } = data;

  // NEXT_PUBLIC_GRAPHQL_API_URL
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: GRAPHQL_URI,

    // credentials: "include",
    credentials: "same-origin",

    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
  });

  const authLink = setContext((_, { headers }) => {
    let newHeaders = {
      ...headers,
    };
    if (token) {
      newHeaders.authorization = `Bearer ${token}`;
    }

    return {
      headers: newHeaders,
    };
  });

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink),
          ])
        : authLink.concat(httpLink),
  });
}

// also have a function to create a suspense cache
function makeSuspenseCache() {
  return new SuspenseCache();
}

interface ApolloWrapperProps extends React.PropsWithChildren {
  // graphqlURI: string;
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: ApolloWrapperProps) {
  const { data, status } = useSession();
  const sessionData = data ?? ({} as any);

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient({ token: sessionData?.token })}
      // makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
