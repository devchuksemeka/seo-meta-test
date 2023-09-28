import RequestDetails from "./request-detail";

interface RequestDetailsPageProps {
  params: { id: string };
}

export default function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  const { id } = params;

  return <RequestDetails id={id} />;
}
