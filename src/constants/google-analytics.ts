export type GAEventTransportType = "beacon" | "xhr" | "image";

type GAEventActionType =
  | "search_for_business"
  | "show_service_request_view"
  | "cancel_service_request_view"
  | "submit_service_request"
  | "close_service_request_completed_view"
  | "share_business"
  | "submit_review";

export interface GAEventProps {
  category: string; // "your category";
  action: GAEventActionType; //"your action";
  label?: string; //"your label"; // optional
  value?: number; //99; // optional, must be a number
  nonInteraction?: boolean; // true; // optional, true/false
  transport?: GAEventTransportType; // "xhr" // optional, beacon/xhr/image;
}
