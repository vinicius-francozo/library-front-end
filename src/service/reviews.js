import { gql } from "@apollo/client";

const GET_USER_REVIEWS = gql`
  query {
    getUserReviews {
      text
      id
      rate
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation CreateReview($bookId: String!, $rate: Float!, $text: String!) {
    createReview(bookId: $bookId, data: { rate: $rate, text: $text }) {
      text
      id
      rate
    }
  }
`;

const UPDATE_REVIEW = gql`
  mutation UpdateReview($reviewId: String!, $rate: Float, $text: String) {
    updateReview(id: $reviewId, data: { rate: $rate, text: $text }) {
      text
      id
      rate
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: String!) {
    deleteReview(id: $reviewId)
  }
`;

export { CREATE_REVIEW, DELETE_REVIEW, GET_USER_REVIEWS, UPDATE_REVIEW };
