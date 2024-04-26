import { gql } from "@apollo/client";

const GET_CHECKOUT = gql`
  query {
    listCheckout {
      id
      book {
        id
        title
        sinopsis
        cover
        author {
          name
        }
      }
    }
  }
`;

const GET_ONE_CHECKOUT_OR_RENTED = gql`
  query ListRentedOrCheckout($bookId: String!) {
    listRentedOrCheckout(bookId: $bookId) {
      id
    }
  }
`;

const GET_RENTALS = gql`
  query {
    listRents {
      id
      book {
        cover
        title
        author {
          name
        }
      }
    }
  }
`;

const CREATE_CHECKOUT_ORDER = gql`
  mutation CreateCheckoutOrder($bookId: String!) {
    createCheckout(bookId: $bookId)
  }
`;

const CONFIRM_PURCHASE = gql`
  mutation {
    confirmPurchase
  }
`;

const RETURN_BOOK = gql`
  mutation ReturnBook($rentId: String!) {
    returnBook(id: $rentId)
  }
`;

const DELETE_FROM_CHECKOUT = gql`
  mutation RemoveBook($rentId: String!) {
    removeBook(id: $rentId)
  }
`;

export {
  GET_CHECKOUT,
  GET_RENTALS,
  CREATE_CHECKOUT_ORDER,
  CONFIRM_PURCHASE,
  RETURN_BOOK,
  DELETE_FROM_CHECKOUT,
  GET_ONE_CHECKOUT_OR_RENTED,
};
