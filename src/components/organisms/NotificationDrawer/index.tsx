import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useMutation } from "@apollo/client";

import styles from "./style.module.scss";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import {
  Notification,
  NotificationCategoryEnum,
  NotificationTypeEnum,
} from "@/constants/notifications";
import {
  getNotificationMessage,
  getNotificationTimer,
} from "@/utils/notifications";
import { useRouter } from "next/navigation";
import MARK_ALL_AS_READ_GQL_TAG from "@/graphql/gql-tags/notifications/mutations";
import Loading from "@/components/atoms/Loading";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: VoidFunction;
  notifications: Notification[];
  refetchNotificationList: Function;
}

const NotificationDrawer = ({
  isOpen,
  onClose,
  notifications,
  refetchNotificationList,
}: NotificationDrawerProps) => {
  const router = useRouter();

  const handleClick = (data: {
    id: string;
    categoryId: string;
    category: NotificationCategoryEnum;
  }) => {
    const { id, category, categoryId } = data;
    router.push(
      `/notifications/${id}?category=${category}&categoryId=${categoryId}`
    );
    onClose();
  };

  const [markAllAsRead, { loading, data }] = useMutation(
    MARK_ALL_AS_READ_GQL_TAG
  );

  const handleOnClickMarkAllAsRead = () => {
    markAllAsRead();
  };

  useEffect(() => {
    if (!loading && data) {
      refetchNotificationList();
    }
  }, [loading, data, refetchNotificationList]);

  return (
    <Drawer anchor='right' open={isOpen} onClose={onClose}>
      <Box className={styles.drawer_header}>
        <Typography>Notifications</Typography>
        <Button
          variant='text'
          onClick={handleOnClickMarkAllAsRead}
          disabled={loading}
        >
          <Icon name='email' color='primary' />
          {loading && <Loading />}
        </Button>
      </Box>
      <List>
        {notifications.map((notification, index) => {
          const { id, payload, isRead, noticeType, createdAt } = notification;
          const { entity, recipient, requester } = payload;
          const { imageUrl: recipientImage, name: recipientName } = recipient;
          const { imageUrl: requesterImage, name: requesterName } = requester;
          return (
            <ListItem
              key={id}
              disablePadding
              className={!isRead ? styles.list_item__not_read : ""}
              onClick={() =>
                handleClick({
                  id,
                  categoryId: entity.id,
                  category: notification.category,
                })
              }
            >
              <ListItemButton className={styles.list_item__button}>
                <Avatar src={requesterImage} alt={requesterName} />
                <ListItemText
                  primary={
                    <Box>
                      <NotificationMessage
                        noticeType={noticeType}
                        requesterName={requesterName}
                        recipientName={recipientName}
                      />
                    </Box>
                  }
                  disableTypography
                  secondary={
                    <Box>
                      <Typography variant='small' color='secondary'>
                        {getNotificationTimer(createdAt)}
                      </Typography>
                    </Box>
                  }
                  className={styles.list_item__text_box}
                >
                  Some text
                </ListItemText>
                <Avatar src={recipientImage} alt={recipientName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
const NotificationMessage = (props: {
  noticeType: NotificationTypeEnum;
  requesterName: string;
  recipientName: string;
}) => {
  const { requesterName, noticeType, recipientName } = props;
  const message = getNotificationMessage(noticeType);
  //
  /**
   * @description break word and replace the ${recipient} ${requester} with the right component when rendering
   * @example
   * ${requester} request ${recipient} service = <strong>{requesterName}</strong> request <em><strong>{recipientName}</strong></em> service
   */

  const messageArray = message.split(" ");
  const messageArrayComponent = messageArray.map((word) => {
    let newWord = <span>{word}</span>;
    if (word === "${recipient}" || word === "${requester}") {
      if (word === "${recipient}") {
        newWord = (
          <strong>
            <em>{recipientName}</em>
          </strong>
        );
      }

      if (word === "${requester}") {
        newWord = <strong>{requesterName}</strong>;
      }
    }
    return newWord;
  });

  return (
    <Typography variant='small'>
      {messageArrayComponent.map((word, i) => (
        <>
          {word}
          {i !== messageArrayComponent.length - 1 && <>&nbsp;</>}
        </>
      ))}
    </Typography>
  );
};

// const
export default NotificationDrawer;
