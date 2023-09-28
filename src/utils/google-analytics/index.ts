import ReactGA from "react-ga4";
import { GAEventProps } from "@/constants/google-analytics";

export const gaEvent = (gaEventProps: GAEventProps): void => {
  console.log("gaEventProps", gaEventProps);
  ReactGA.event(gaEventProps);
};
