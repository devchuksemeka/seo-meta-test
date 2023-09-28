import { Badge } from "@mui/material";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import Icon from "@/components/atoms/Icon";
import GET_NOTIFICATIONS_GQL from "@/graphql/gql-tags/notifications/queries";
import NotificationDrawer from "../NotificationDrawer";
import useDrawer from "@/hooks/useDrawer";
import Button from "@/components/atoms/Button";
import { useMutation } from "@apollo/client";
import { Notification } from "@/constants/notifications";

const AppHeaderNotificationBadge = () => {
  const {
    isOpen: isNotificationDrawerOpen,
    close: closeNotificationDrawer,
    open: openNotificationDrawer,
  } = useDrawer();
  const { data, loading, error, refetch } = useQuery(GET_NOTIFICATIONS_GQL, {
    fetchPolicy: "cache-first",
  });

  const notifications = Array.isArray(data?.getNotifications)
    ? data?.getNotifications
    : [];

  const badgeCount = notifications.filter(
    (notification: Notification) => !notification.isRead
  ).length;

  return (
    <>
      <Button variant='text'>
        <Badge
          showZero
          badgeContent={badgeCount}
          color='error'
          onClick={openNotificationDrawer}
        >
          <Icon name='notification' color='primary' fontSize='1.75rem' />
        </Badge>
      </Button>
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={closeNotificationDrawer}
        notifications={notifications}
        refetchNotificationList={refetch}
      />
    </>
  );
};

export default AppHeaderNotificationBadge;
