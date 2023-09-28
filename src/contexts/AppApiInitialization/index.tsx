"use client";

import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_APP_INITIALIZE_GQL } from "@/graphql/gql-tags/business/queries";
import useLocalStorage from "@/hooks/useLocalStorage";

export interface LocationArea {
  id: string;
  name: string;
  slug: string;
  parent_slug: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
}

const AppApiInitializationContext = React.createContext<{
  locationAreas: LocationArea[];
  services: Service[];
}>({
  locationAreas: [],
  services: [],
});

const { Provider } = AppApiInitializationContext;

interface AppApiInitializationProviderProps {
  children: any;
}

export const AppApiInitializationProvider = ({
  children,
}: AppApiInitializationProviderProps) => {
  const [locationAreas, setLocationAreas] = useState<LocationArea[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const { data, loading, error } = useQuery(GET_APP_INITIALIZE_GQL, {
    fetchPolicy: "cache-first",
  });

  const { getServices, getLocationAreas } = data ?? {};

  useEffect(() => {
    if (getServices?.length > 0) {
      setServices(getServices);
    }
    if (getLocationAreas?.length > 0) {
      setLocationAreas(getLocationAreas);
    }
  }, [getServices, getLocationAreas]);

  const value = {
    locationAreas,
    services,
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useAppApiInitializationContext = () =>
  useContext(AppApiInitializationContext);
