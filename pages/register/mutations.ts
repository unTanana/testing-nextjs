import { gql } from '@apollo/client';

const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export { REGISTER };
