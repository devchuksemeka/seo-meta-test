"use client";

import { NetworkStatus, useLazyQuery } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useRouter, useSearchParams } from "next/navigation";

import BusinessCard from "./components/BusinessCard/BusinessCard";
import BusinessFilter from "./components/BusinessFilter";
import Typography from "@/components/atoms/Typography";
import styles from "./list.module.scss";
import GET_BUSINESSES_GQL from "@/graphql/gql-tags/business/queries";
import { useAppApiInitializationContext } from "@/contexts/AppApiInitialization";
import Loading from "@/components/atoms/Loading";

export default function BusinessSearchList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("serviceType");
  const location = searchParams.get("location");

  const { locationAreas, services } = useAppApiInitializationContext();

  const { data, loading, error } = useQuery(GET_BUSINESSES_GQL, {
    fetchPolicy: "cache-first",
    variables: {
      serviceType,
      location,
    },
    skip: !serviceType || !location,
  });

  const selectedLocation = locationAreas.find(
    (locationArea) => locationArea.slug === location
  );
  const selectedServiceType = services.find(
    (services) => services.slug === serviceType
  );

  const totalCount = data?.getBusinesess?.length;

  const onSearchSubmit = ({ serviceType, location }: any) => {
    const { value: serviceTypeValue } = serviceType;
    const { value: locationValue } = location;
    // router.replace({
    //   query: { serviceType: serviceTypeValue, location: locationValue },
    // });
  };

  return (
    <section className={styles.main_content}>
      {selectedLocation && selectedServiceType ? (
        <>
          <BusinessFilter
            locationAreas={locationAreas}
            services={services}
            selectedLocation={selectedLocation}
            selectedServiceType={selectedServiceType}
            onSearch={onSearchSubmit}
            loading={loading}
          />

          {loading && <Loading />}
          {/* {error && <Loading />} */}
          {data && (
            <>
              <Typography variant='large' fontStyle='extra-bold'>
                {totalCount} {selectedServiceType.name} found from your search
              </Typography>
              <section className={styles.business_list_container}>
                {data?.getBusinesess.map((business: any, index: number) => {
                  const { id } = business;
                  return (
                    <BusinessCard
                      key={id ?? index.toString()}
                      item={business}
                    />
                  );
                })}
              </section>
            </>
          )}
        </>
      ) : null}
    </section>
  );
}
