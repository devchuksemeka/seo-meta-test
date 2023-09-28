import { GET_ORDERS_TAG, GET_ORDER_BY_ID_TAG } from "./queries";

import { getRandomItemFromArray } from "../../helpers/getRandom";

const getMarketPlace = () => {
  const images = ["Jumia", "Konga", "Shopify", "Ebay", "Amazon", "Rafia"];
  return getRandomItemFromArray(images);
};

const getStatus = () => {
  const statuses = ["canceled", "paid", "refunded"];
  return getRandomItemFromArray(statuses);
};

export const getOrder = (index = 1) => {
  const item = {
    id: `#${index}`,
    date: `${index}th Nov 2022, 10:20 AM`,
    status: getStatus(),
    marketplace: {
      name: getMarketPlace(),
    },
    product: {
      id: `#${index}`,
      name: "Nike Sport V2",
    },
    revenue: `$10${index},20`,
    orderId: `#${4534244 * index}`,
    orderNumber: `${24152 * index}`,
    code: `KF332`,
    billing: {
      name: "Viking Burrito",
      email: "oliver@burrito.com",
      vatNumber: "FRB1235476",
    },
    orderTracker: {
      received: "22 DEC 7:20 PM",
      generatesOrderId: "22 DEC 7:21 AM",
      transmitToCourier: "22 DEC 4:54 PM",
      delivered: "22 DEC 4:54 PM",
    },
    payment: {
      type: "CARD",
      card: {
        type: "MASTER",
        last4Digit: "7852",
      },
    },
    orderSummary: {
      productPrice: "$90",
      deliveryPrice: "$14",
      taxes: "$1.95",
      total: "$105.95",
    },
  };

  return item;
};

export const getOrders = (total = 20) => {
  const products = [];
  for (let i = 1; i <= total; i = 1 + i) {
    products.push(getOrder(i));
  }

  return products;
};

// export default getProducts;

// ------------------------------------------------------------- MOCKS BEGIN ---------------------------------------------------------------------

export const getOrderListMock = () => {
  const orders = getOrders(20);
  const request = {
    query: GET_ORDERS_TAG,
  };
  const result = {
    data: {
      getOrders: orders,
    },
  };

  return {
    request,
    result,
  };
};

export const getOrderByIdMocks = () => {
  const orders = getOrders(20);
  const mocks = [];
  orders.forEach((order) => {
    const { id } = order;
    const request = {
      query: GET_ORDER_BY_ID_TAG,
      variables: {
        id,
      },
    };
    const result = {
      data: {
        getOrder: order,
      },
    };
    mocks.push({
      request,
      result,
    });
  });
  return mocks;
};

export default getOrderListMock;
