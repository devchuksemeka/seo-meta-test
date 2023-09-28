import { gql } from "@apollo/client";

const TOGGLE_MARKETPLACE_TAG = gql`
  # mutation toggleMarketPlace($marketplaceId: String!, $status: UserMarketplaceStatus!) {
  #   toggleMarketPlace(toggleMarketPlaceInput: { marketplaceId: $marketplaceId, status: $status }) {
  #     status
  #     message
  #   }
  # }
`;

export default TOGGLE_MARKETPLACE_TAG;
