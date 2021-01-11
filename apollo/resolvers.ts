let book = {
  name: 'The Hungarian Sausage',
  author: 'Ben Grunfeld',
};

import {
  getAllUsers,
  createUser,
  login,
  deleteUser,
  changePassword,
  getNewAuthToken,
} from '../lib/users';

export const resolvers = {
  Query: {
    book: () => book,
    users: (_root, _args, context) => {
      if (!context.user) {
        throw new Error('UNAUTHORIZED');
      }
      return getAllUsers();
    },
  },

  Mutation: {
    updateBook: (root, args) => {
      book.name = args.name;
      book.author = args.author;
      return book;
    },
    createUser: (root, args) => {
      return createUser({
        username: args.username,
        password: args.password,
      });
    },
    login: (root, args) => {
      return login({
        username: args.username,
        password: args.password,
      });
    },
    deleteUser: (root, args) => {
      return deleteUser(args.userId);
    },
    changePassword: (root, args) => {
      return changePassword({
        userId: args.userId,
        oldPassword: args.oldPassword,
        newPassword: args.newPassword,
      });
    },
    refreshToken: (_root, _args, context) => {
      return getNewAuthToken(context.req);
    },
  },
};
