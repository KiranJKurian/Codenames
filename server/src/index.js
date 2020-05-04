const { ApolloServer } = require('apollo-server');
// const util = require('util');
const { merge } = require('lodash');
// const typeDefs = require('./graphql/schemas');
// const resolvers = require('./graphql/resolvers');
const { db } = require('./mongoose');
// const { createRoom, findRoom } = require('./mongoose/types/Room');
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

// const dataSources = require('./graphql/datasources');

db.once('open', () => {
  // we're connected!
  console.log('Connected to MongoDB');

  // createRoom()
  //   .then(room => room.createGame())
  //   .then(room => room.addPlayer('Destroyer'))
  //   .then(player => player.parent())
  //   .then(room => console.log(util.inspect(room, false, null, true /* enable colors */)))
  //   .catch(err => {
  //     console.error(err);
  //     return null;
  //   });

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
    // dataSources,
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
