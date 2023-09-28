"use client";

import React, { useContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

import { GET_APP_INITIALIZE_GQL } from "@/graphql/gql-tags/business/queries";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const AppSessionContext = React.createContext<{}>({});

const { Provider } = AppSessionContext;

interface AppSessionProviderProps {
  children: any;
}

export const AppSessionProvider = ({ children }: AppSessionProviderProps) => {
  // const { data, loading, error } = useQuery(GET_APP_INITIALIZE_GQL, {
  //   fetchPolicy: "cache-first",
  // });

  // const { getServices, getLocationAreas } = data ?? {};

  // const value = {};

  return <SessionProvider session={undefined}>{children}</SessionProvider>;

  // return <Provider value={value}>
  //   {children}
  //   </Provider>;
};

// export const useAppApiInitializationContext = () =>
//   useContext(AppApiInitializationContext);
