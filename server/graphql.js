import { server } from './src';

export const graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
