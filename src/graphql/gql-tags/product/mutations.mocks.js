import { CREATE_PRODUCT_TAGS, UPDATE_PRODUCT_TAGS } from "./mutations";

const mockProductId = "472994-8442-2342-97423";

export const createProductMockVariables = {
  name: "Chuks",
  weight: "3.2",
  category: "Others",
  size: "Extra Large",
  price: "42344",
  price_currency: "USD",
  sku: "8492324455332",
  tags: ["Black Friday", "In Stock"],
};

export const updateProductMockVariables = {
  id: "#1",
  updateProductInput: createProductMockVariables,
};

export const createProductDataMock = {
  request: {
    query: CREATE_PRODUCT_TAGS,
    variables: createProductMockVariables,
  },
  result: {
    data: {
      createProduct: {
        id: mockProductId,
      },
    },
  },
};

export const updateProductDataMock = {
  request: {
    query: UPDATE_PRODUCT_TAGS,
    variables: updateProductMockVariables,
  },
  result: {
    data: {
      updateProduct: true,
    },
  },
};

export default createProductDataMock;
