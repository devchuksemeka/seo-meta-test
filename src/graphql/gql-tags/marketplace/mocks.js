import appLogo from "../../assets/images/small-logos/carojon.png";
import TOGGLE_MARKETPLACE_TAG from "./mutations";
import { GET_MARKETPLACES } from "./queries";

const ENABLED = "ENABLED";
const DISABLED = "DISABLED";

const marketPlaces = [
  {
    id: 1,
    image: appLogo,
    title: "jumai",
    status: ENABLED,
  },
  {
    id: 2,
    image: appLogo,
    title: "konga",
    status: DISABLED,
  },
  {
    id: 3,
    image: appLogo,
    title: "amazon",
    status: ENABLED,
  },
  {
    id: 4,
    image: appLogo,
    title: "ebay",
    status: DISABLED,
  },
  {
    id: 5,
    image: appLogo,
    title: "spotify",
    status: ENABLED,
  },
  {
    id: 6,
    image: appLogo,
    title: "alibaba",
    status: DISABLED,
  },
  {
    id: 7,
    image: appLogo,
    title: "rafia",
    status: ENABLED,
  },
  {
    id: 8,
    image: appLogo,
    title: "marketplace 1",
    status: DISABLED,
  },
  {
    id: 9,
    image: appLogo,
    title: "marketplace 2",
    status: ENABLED,
  },
  {
    id: 10,
    image: appLogo,
    title: "marketplace 3",
    status: DISABLED,
  },
  {
    id: 11,
    image: appLogo,
    title: "marketplace 4",
    status: ENABLED,
  },
  {
    id: 12,
    image: appLogo,
    title: "marketplace 5",
    status: DISABLED,
  },
];

const getMarketPlacesMock = {
  request: {
    query: GET_MARKETPLACES,
  },
  result: {
    data: {
      getUserMarketPlaces: marketPlaces,
    },
  },
};

const getMarketPlaceDetailsMock = () => {
  const mocks = [];
  marketPlaces.forEach((marketPlace) => {
    const { status, id } = marketPlace;
    mocks.push({
      request: {
        query: TOGGLE_MARKETPLACE_TAG,
        variables: {
          marketPlaceId: id,
          status: status === ENABLED ? DISABLED : ENABLED,
        },
      },
      result: {
        data: {
          toggleMarketPlace: {
            status: "SUCCESS",
            message: "Marketplace update Successful",
          },
        },
      },
    });
  });
  return mocks;
};

const successToggleMarketPlace = {
  request: {
    query: TOGGLE_MARKETPLACE_TAG,
    variables: {
      marketPlaceId: 1,
      status: "ENABLED",
    },
  },
  result: {
    data: {
      toggleMarketPlace: {
        status: "SUCCESS",
        message: "Marketplace update Successful",
      },
    },
  },
};

export { getMarketPlacesMock, successToggleMarketPlace, getMarketPlaceDetailsMock };
export default getMarketPlacesMock;
