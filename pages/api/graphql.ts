import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../apollo/typedefs';
import { resolvers } from '../../apollo/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
