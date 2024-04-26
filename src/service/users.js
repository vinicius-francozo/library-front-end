import { gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser($id: String!) {
    findOneUser(id: $id) {
      image
      email
      username
      name
      surname
      age
      phone
      street
      neighbourhood
      number
      city
      country
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $username: String
    $email: String
    $surname: String
    $age: Float
    $phone: String
    $street: String
    $neighbourhood: String
    $number: String
    $city: String
    $country: String
    $name: String
  ) {
    updateUser(
      data: {
        name: $name
        username: $username
        email: $email
        surname: $surname
        age: $age
        phone: $phone
        street: $street
        neighbourhood: $neighbourhood
        number: $number
        city: $city
        country: $country
      }
    ) {
      image
      email
      username
      name
      surname
      age
      phone
      street
      neighbourhood
      number
      city
      country
    }
  }
`;

const CHANGE_IMAGE = gql`
  mutation ChangeImage($image: Upload) {
    changeImage(image: $image) {
      image
      email
      username
      name
      surname
      age
      phone
      street
      neighbourhood
      number
      city
      country
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    createUser(
      data: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      username
      email
    }
  }
`;

export { CHANGE_IMAGE, CREATE_USER, GET_USER, UPDATE_USER };
