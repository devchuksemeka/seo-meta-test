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
    (location: any) => location.slug === location
  );

  const selectedServiceType = data?.getServices?.find(
    (service: any) => service.slug === serviceType
  );

  if (selectedServiceType?.name && selectedLocation?.name) {
    const title = `${selectedServiceType.name} Businesses @ ${selectedLocation.name}`;
    const description = `Looking for the best ${selectedServiceType.name} business at location ${selectedLocation.name}. Search no further, relax and make a pick from the list you find here`;
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

  return {};
}

export default function BusinessList() {
  return <BusinessSearchList />;
}
