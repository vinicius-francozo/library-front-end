import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query {
    findAllAuthors {
      id
      name
    }
  }
`;

const GET_AUTHORS_PAGINATED = gql`
  query GetAuthorsPaginated($perPage: String!, $page: String!) {
    authorPerPage(perPage: $perPage, page: $page) {
      name
      surname
      birth_date
      country
      picture
      description
      id
      user {
        id
      }
    }
  }
`;

const CREATE_AUTHOR = gql`
  mutation CreateAuthor(
    $name: String!
    $surname: String!
    $birth_date: String!
    $country: String!
    $picture: Upload!
    $description: String!
  ) {
    createAuthor(
      data: {
        name: $name
        surname: $surname
        birth_date: $birth_date
        country: $country
        picture: $picture
        description: $description
      }
    ) {
      id
    }
  }
`;

const GET_AUTHOR_BY_ID = gql`
  query GetAuthor($id: String!) {
    findOneAuthor(id: $id) {
      id
      name
      surname
      birth_date
      country
      picture
      description
      user {
        id
      }
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor(
    $id: String!
    $name: String
    $surname: String
    $birth_date: String
    $country: String
    $picture: Upload
    $description: String
  ) {
    updateAuthor(
      id: $id
      data: {
        name: $name
        surname: $surname
        birth_date: $birth_date
        country: $country
        picture: $picture
        description: $description
      }
    ) {
      name
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: String!) {
    deleteAuthor(id: $id)
  }
`;

export {
  GET_AUTHORS,
  CREATE_AUTHOR,
  GET_AUTHOR_BY_ID,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
  GET_AUTHORS_PAGINATED,
};
