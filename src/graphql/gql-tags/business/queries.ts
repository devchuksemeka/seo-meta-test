import { gql } from "@apollo/client";

const GET_BUSINESSES_GQL = gql`
  query getBusinesess($location: String!, $serviceType: String!) {
    getBusinesess(
      getBusinessesFilter: { serviceType: $serviceType, location: $location }
    ) {
      id
      image
      name
      bannerUrl
    }
  }
`;

export const GET_BUSINESS_GQL = gql`
  query getBusiness($id: String!) {
    getBusiness(id: $id) {
      id
      bannerUrl
      image
      name
      description
      locations
      services
      bannerUrl
      rating
    }
  }
`;

export const GET_APP_INITIALIZE_GQL = gql`
  query getBusinessServicesAndLocations {
    getLocationAreas {
      id
      slug
      parent_slug
      name
    }
    getServices {
      id
      slug
      name
    }
  }
`;

export { GET_BUSINESSES_GQL };

export default GET_BUSINESSES_GQL;
