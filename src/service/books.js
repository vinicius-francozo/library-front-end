import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    findAllBooks {
      id
    }
  }
`;

const GET_BOOKS_PAGINATED = gql`
  query GetBooksPaginated($perPage: String!, $page: String!) {
    bookPerPage(perPage: $perPage, page: $page) {
      id
      title
      release_date
      cover
      sinopsis
      pages
      publisher
      edition
      author {
        name
        surname
      }
      category {
        name
      }
    }
  }
`;

const GET_BOOKS_BY_NAME = gql`
  query BooksByName($name: String!) {
    bookByName(name: $name) {
      id
      title
      release_date
      cover
      sinopsis
      pages
      publisher
      edition
      author {
        name
        surname
      }
      category {
        name
      }
    }
  }
`;

const GET_BOOK_BY_ID = gql`
  query GetBook($id: String!) {
    findOneBook(id: $id) {
      id
      title
      release_date
      cover
      sinopsis
      pages
      publisher
      edition
      user {
        id
      }
      author {
        id
        name
        surname
      }
      category {
        id
        name
      }
      reviews {
        id
        rate
        text
        user {
          id
          username
        }
      }
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $publisher: String!
    $sinopsis: String!
    $edition: String!
    $cover: Upload!
    $pages: Float!
    $release_date: String!
    $author_id: Float!
    $category_id: Float!
  ) {
    createBook(
      data: {
        title: $title
        publisher: $publisher
        sinopsis: $sinopsis
        edition: $edition
        cover: $cover
        pages: $pages
        release_date: $release_date
        author_id: $author_id
        category_id: $category_id
      }
    ) {
      id
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: String!
    $title: String
    $publisher: String
    $sinopsis: String
    $edition: String
    $cover: Upload
    $pages: Float
    $release_date: String
    $author_id: Float
    $category_id: Float
  ) {
    updateBook(
      id: $id
      data: {
        title: $title
        publisher: $publisher
        sinopsis: $sinopsis
        edition: $edition
        cover: $cover
        pages: $pages
        release_date: $release_date
        author_id: $author_id
        category_id: $category_id
      }
    ) {
      title
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id)
  }
`;

export {
  GET_BOOKS,
  CREATE_BOOK,
  GET_BOOK_BY_ID,
  UPDATE_BOOK,
  DELETE_BOOK,
  GET_BOOKS_PAGINATED,
  GET_BOOKS_BY_NAME,
};
