import { gql } from '@apollo/client';

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export { SIGN_OUT };
