import { Business } from "./business";
import { User } from "./user";

export enum RequestStatusEnum {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  CANCELLED = "cancelled",
  ON_GOING = "on_going",
  COMPLETED = "completed",
}

export const RequestStatusMapping = new Map<
  RequestStatusEnum,
  { name: string }
>([
  [
    RequestStatusEnum.REQUESTED,
    {
      name: "Submitted",
    },
  ],
  [
    RequestStatusEnum.ACCEPTED,
    {
      name: "Accepted",
    },
  ],
  [
    RequestStatusEnum.DECLINED,
    {
      name: "Declined",
    },
  ],
  [
    RequestStatusEnum.CANCELLED,
    {
      name: "Cancelled",
    },
  ],
  [
    RequestStatusEnum.ON_GOING,
    {
      name: "On Going",
    },
  ],
  [
    RequestStatusEnum.COMPLETED,
    {
      name: "Completed",
    },
  ],
]);

export const ClientViewStatusSteps: RequestStatusEnum[] = [
  RequestStatusEnum.REQUESTED,
  RequestStatusEnum.ACCEPTED,
  RequestStatusEnum.ON_GOING,
  RequestStatusEnum.COMPLETED,
];
export const ClientViewStatusCanceledSteps: RequestStatusEnum[] = [
  RequestStatusEnum.REQUESTED,
  RequestStatusEnum.CANCELLED,
];

export interface BusinessReview {
  id: string;
  businessId: string;
  requestId: string;
  rating: number;
  message: string;
}

export interface GetBusinessReviewResult {
  rating: number;
  reviews: BusinessReview[];
}
