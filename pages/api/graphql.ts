import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';
import { getSession } from '../../lib/auth';

const server = new ApolloServer({
  schema,
  context(ctx) {
    return { ...ctx, user: getSession(ctx.req) };
  },
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
