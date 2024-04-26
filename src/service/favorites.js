import { gql } from "@apollo/client";

const GET_FAVORITES = gql`
  query {
    getUserFavorites {
      id
      book {
        id
        title
        cover
        author {
          name
        }
      }
    }
  }
`;

const GET_FAVORITE = gql`
  query GetOneFavorite($bookId: String!) {
    getFavoriteByUserAndBookId(bookId: $bookId)
  }
`;

const CREATE_FAVORITE = gql`
  mutation CreateFavorite($bookId: String!) {
    createFavorite(bookId: $bookId)
  }
`;

const REMOVE_FAVORITE = gql`
  mutation DeleteFavorite($bookId: String!) {
    removeFavorite(bookId: $bookId)
  }
`;

export { GET_FAVORITES, CREATE_FAVORITE, REMOVE_FAVORITE, GET_FAVORITE };
