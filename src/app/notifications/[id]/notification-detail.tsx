"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import styles from "./style.module.scss";
import { NotificationCategoryEnum } from "@/constants/notifications";
import { READ_NOTIFICATION_GQL_TAG } from "@/graphql/gql-tags/notifications/queries";
import Loading from "@/components/atoms/Loading";

interface NotificationDetailProps {
  params: { id: string };
  searchParams: { category: NotificationCategoryEnum; categoryId: string };
}

export default function NotificationDetail({
  params,
  searchParams,
}: NotificationDetailProps) {
  const router = useRouter();

  const { id } = params;
  const { category, categoryId } = searchParams;

  const { data, loading, error } = useQuery(READ_NOTIFICATION_GQL_TAG, {
    variables: {
      id,
    },
  });

  useEffect(() => {}, [data, loading]);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' py='5rem'>
        <Loading />
      </Box>
    );
  }

  if (category === NotificationCategoryEnum.ORDER) {
    router.push(`/requests/${categoryId}`);
  }

  return (
    <section className={styles.wrapper}>
      <section>No Match for Notification Category</section>
    </section>
  );
}
