import { Metadata, ResolvingMetadata } from "next";
import BusinessProfile from "./business-profile";
import { getClient } from "@/graphql/ApolloProvider/ApolloClient";
import {
  GET_APP_INITIALIZE_GQL,
  GET_BUSINESS_GQL,
} from "@/graphql/gql-tags/business/queries";
import { defaultOpenGraph } from "@/constants/metadata";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const { data } = await getClient().query({
    query: GET_BUSINESS_GQL,
    fetchPolicy: "cache-first",
    variables: {
      id,
    },
  });

  const result = data?.getBusiness;
  const name = result?.name;
  const descriptionValue = result?.description;
  const imageUrl = result?.image;

  const title = name;
  const description =
    descriptionValue ??
    'A business/service provider you can rely on for the best, reliable & credible service"';
  return {
    title,
    description,
    openGraph: {
      ...defaultOpenGraph,
      title,
      description,
      images: [
        {
          url: imageUrl,
          height: "600",
          width: "800",
        },
      ],
    },
  };
}

export default function BusinessProfilePage({ params, searchParams }: Props) {
  return <BusinessProfile id={params.id} />;
}
