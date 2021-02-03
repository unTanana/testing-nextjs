import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Query {
    users: [User]
  }
  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Boolean!
    deleteUser(userId: ID!): Boolean
    changePassword(
      userId: ID!
      oldPassword: String!
      newPassword: String!
    ): Boolean
  }

  type User {
    id: ID!
    username: String!
    password: String
    description: String
  }
`;
