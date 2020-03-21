const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// const dataSources = require('./graphql/datasources');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // dataSources,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});