import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query {
    findAllCategories {
      name
      id
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      name
      id
    }
  }
`;

export { GET_CATEGORIES, CREATE_CATEGORY };
