import { Metadata, ResolvingMetadata } from "next";
import BusinessSearchList from "./list";
import { getClient } from "@/graphql/ApolloProvider/ApolloClient";
import { GET_APP_INITIALIZE_GQL } from "@/graphql/gql-tags/business/queries";
import { defaultOpenGraph } from "@/constants/metadata";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { serviceType, location } = searchParams;

  const { data } = await getClient().query({
    query: GET_APP_INITIALIZE_GQL,
    fetchPolicy: "cache-first",
  });

  const selectedLocation = data?.getLocationAreas?.find(
    (locationData: any) => locationData.slug === location
  );

  const selectedServiceType = data?.getServices?.find(
    (service: any) => service.slug === serviceType
  );

  const serviceName = selectedServiceType?.name;
  const locationName = selectedLocation?.name;

  const title = `${serviceName} Businesses @ ${locationName}`;
  const description = `Looking for the best ${serviceName} business at location ${locationName}. Search no further, relax and make a pick from the list you find here`;
  return {
    title,
    description,
    openGraph: {
      ...defaultOpenGraph,
      title,
      description,
    },
  };
}

export default function BusinessList() {
  return <BusinessSearchList />;
}
