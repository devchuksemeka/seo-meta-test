const { gql } = require("@apollo/client");

export const CREATE_PRODUCT_TAGS = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_TAGS = gql`
  mutation updateProduct($id: String, $updateProductInput: UpdateProductInput) {
    updateProduct(id: $id, updateProductInput: $updateProductInput)
  }
`;

export default CREATE_PRODUCT_TAGS;
