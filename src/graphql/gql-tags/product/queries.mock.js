import {
  GET_CREATE_PRODUCT_PRE_REQUIRED_DATA_TAG,
  GET_PRODUCTS_TAG,
  GET_PRODUCT_BY_ID_TAG,
} from "./queries";
import { getRandomItemFromArray } from "../../helpers/getRandom";

const sizes = ["Extra Large", "Extra Small", "Large", "Medium", "Small"];
const categories = ["Clothing", "Electronics", "Furniture", "Others", "Real Estate"];
const tags = ["Black Friday", "Expired", "Out of Stock", "In Stock", "Sale"];
const currencies = ["BTC", "CNY", "EUR", "GBP", "INR", "USD"];
const colors = ["Black", "Blue", "Green", "Orange", "White", "Yellow"];

const getPublishedStatus = () => {
  const statuses = ["COMPLETED", "IN_PROGRESS", "NOT_STARTED"];

  return getRandomItemFromArray(statuses);
};
const getStockStatus = () => {
  const statuses = ["IN_STOCK", "OUT_OF_STOCK"];
  return getRandomItemFromArray(statuses);
};

export const getProduct = (index = 1) => {
  const item = {
    amount: `500${index}00N`,
    category: `Category ${index}`,
    createdAt: `${index}th March, 2022`,
    description: `Long sleeves black denim jacket with a twisted design. Contrast stitching. Button up closure. White arrow prints on the back.`,
    id: `#${index}`,
    name: `Product Name ${index}`,
    publishedStatus: getPublishedStatus(),
    stockStatus: getStockStatus(),
    weight: 2.3,
    quantity: 10 + index,
    price: 21340 * index,
    price_currency: "USD",
    sku: 21340 * index * 0.5,
    tags: ["Black Friday", "In Stock"],
    size: "Extra Large",
    colors: ["Black", "Yellow"],
  };

  return item;
};

export const getProducts = (total = 20) => {
  const products = [];
  for (let i = 1; i <= total; i = 1 + i) {
    products.push(getProduct(i));
  }

  return products;
};

// ------------------------------------------------------------- MOCKS BEGIN ---------------------------------------------------------------------

export const getCreateProductPreRequiredDataMock = () => {
  const response = {
    request: {
      query: GET_CREATE_PRODUCT_PRE_REQUIRED_DATA_TAG,
    },
    result: {
      data: {
        getCreateProductPreRequiredData: {
          sizes,
          categories,
          tags,
          currencies,
          colors,
        },
      },
    },
  };

  return response;
};

export const getProductListMock = () => {
  const products = getProducts(20);
  const request = {
    query: GET_PRODUCTS_TAG,
  };
  const result = {
    data: {
      getProducts: products,
    },
  };

  return {
    request,
    result,
  };
};

export const getProductByIdMocks = () => {
  const products = getProducts(20);
  const mocks = [];
  products.forEach((product) => {
    const { id } = product;
    const request = {
      query: GET_PRODUCT_BY_ID_TAG,
      variables: {
        productId: id,
      },
    };
    const result = {
      data: {
        getProduct: product,
        sizes,
        colors,
        currencies,
        categories,
        tags,
      },
    };

    mocks.push({
      request,
      result,
    });
  });

  return mocks;
};

export default getProductListMock;
