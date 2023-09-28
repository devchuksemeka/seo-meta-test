export interface NotificationPayloadUserIdentity {
  name: string;
  imageUrl: string;
}

export interface NotificationPayloadEntitySchema {
  id: string;
}

export interface NotificationPayloadSchema {
  entity: NotificationPayloadEntitySchema;
  requester: NotificationPayloadUserIdentity;
  recipient: NotificationPayloadUserIdentity;
}

export interface Notification {
  id: string;
  message: string;
  category: NotificationCategoryEnum;
  isRead: boolean;
  noticeType: NotificationTypeEnum;
  recipientId: string;
  payload: NotificationPayloadSchema;
  createdAt: Date | string;
}

export enum NotificationTypeEnum {
  "NOTICE_SERVICE_REQUEST" = "NOTICE_SERVICE_REQUEST",
  "NOTICE_SERVICE_REQUEST_CANCELLED" = "NOTICE_SERVICE_REQUEST_CANCELLED",
  "NOTICE_SERVICE_REQUEST_ACCEPTED" = "NOTICE_SERVICE_REQUEST_ACCEPTED",
}

export enum NotificationCategoryEnum {
  "ORDER" = "Order",
}
