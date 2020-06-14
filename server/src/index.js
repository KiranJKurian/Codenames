const { ApolloServer } = require('apollo-server');
const { merge } = require('lodash');
const { db } = require('./mongoose');
const Side = require('./graphql/types/side');
const Query = require('./graphql/types/query');
const Mutation = require('./graphql/types/mutation');
const {
  typeDef: MutationResponse,
  resolvers: mutationResponseResolvers,
} = require('./graphql/types/mutationResponse');
const { typeDef: Room, resolvers: roomResolvers } = require('./graphql/types/room');
const { typeDef: Game, resolvers: gameResolvers } = require('./graphql/types/game');
const { typeDef: Player, resolvers: playerResolvers } = require('./graphql/types/player');
const { typeDef: Tile, resolvers: tileResolvers } = require('./graphql/types/tile');

db.once('open', () => {
  // we're connected!
  console.log('Connected to MongoDB');

  const server = new ApolloServer({
    typeDefs: [Query, Mutation, MutationResponse, Side, Room, Game, Tile, Player],
    resolvers: merge(
      {},
      mutationResponseResolvers,
      roomResolvers,
      gameResolvers,
      playerResolvers,
      tileResolvers
    ),
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
