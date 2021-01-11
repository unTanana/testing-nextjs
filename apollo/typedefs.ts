import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Book {
    name: String
    author: String
  }
  type Query {
    book: Book
    users: [User]
  }
  type Mutation {
    updateBook(name: String!, author: String!): Book
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): LoginDetails!
    refreshToken: String!
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
    description: String
  }

  type LoginDetails {
    authToken: String!
    refreshToken: String!
  }
`;
