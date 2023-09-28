import { NotificationTypeEnum } from "@/constants/notifications";

export const getNotificationMessage = (noticeType: NotificationTypeEnum) => {
  let message = "";
  if (noticeType === NotificationTypeEnum.NOTICE_SERVICE_REQUEST) {
    message = "${requester} requested ${recipient} service";
  }
  return message;
};

export const getNotificationTimer = (dateValue: Date | string): string => {
  const now = new Date();
  const notificationDate = new Date(dateValue);

  if (isNaN(notificationDate.getTime())) {
    return "Invalid date";
  }

  const diffInSeconds = Math.floor(
    (now.getTime() - notificationDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 604800) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else {
    return notificationDate.toDateString();
  }
};
