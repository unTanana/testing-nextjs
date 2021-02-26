import {
  getAllUsers,
  createUser,
  login,
  deleteUser,
  changePassword,
  signOut,
} from '../lib/users';

export const resolvers = {
  Query: {
    users: (_root, _args, context) => {
      if (!context.user) {
        throw new Error('UNAUTHORIZED');
      }
      return getAllUsers();
    },
  },

  Mutation: {
    createUser: (root, args, context) => {
      return createUser({
        username: args.username,
        password: args.password,
      });
    },
    login: (root, args, context) => {
      return login(
        {
          username: args.username,
          password: args.password,
        },
        context.res
      );
    },
    deleteUser: (root, args, context) => {
      if (!context.user) {
        throw new Error('UNAUTHORIZED');
      }
      return deleteUser(args.userId);
    },
    changePassword: (root, args, context) => {
      if (!context.user) {
        throw new Error('UNAUTHORIZED');
      }
      return changePassword({
        userId: args.userId,
        oldPassword: args.oldPassword,
        newPassword: args.newPassword,
      });
    },
    signOut: (root, args, context) => {
      if (!context.user) {
        throw new Error('UNAUTHORIZED');
      }
      return signOut(context.res);
    },
  },
};
