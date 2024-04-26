import { gql } from "@apollo/client";

const LOGIN_REQUEST = gql`
  mutation Login($username: String!, $password: String!) {
    login(data: { username: $username, password: $password })
  }
`;

export { LOGIN_REQUEST };
