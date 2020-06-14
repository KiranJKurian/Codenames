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
const { Room: mongooseRoom } = require('./mongoose/types/Room');

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
    context: async ({ req: { body: { variables: { name, roomCode } = {} } = {} } = {} }) => {
      if (!roomCode || !name) {
        return {};
      }
      try {
        return await mongooseRoom
          .findOne({ roomCode }, { games: { $slice: -1 }, players: { $elemMatch: { name } } })
          .then(room => {
            const {
              players: [player],
              games: [currentGame],
            } = room;

            return { player, currentGame };
          })
          .catch(() => ({}));
      } catch (e) {
        return {};
      }
    },
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
