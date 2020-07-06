import { ApolloServer } from 'apollo-server';
import { merge } from 'lodash';
import { db } from './mongoose';
import Side from './graphql/types/side';
import ActionType from './graphql/types/actionType';
import Query from './graphql/types/query';
import Mutation from './graphql/types/mutation';
import {
  typeDef as MutationResponse,
  resolvers as mutationResponseResolvers,
} from './graphql/types/mutationResponse';
import { typeDef as Room, resolvers as roomResolvers } from './graphql/types/room';
import { typeDef as Game, resolvers as gameResolvers } from './graphql/types/game';
import { typeDef as Player, resolvers as playerResolvers } from './graphql/types/player';
import { typeDef as Tile, resolvers as tileResolvers } from './graphql/types/tile';
import { typeDef as Action, resolvers as actionResolvers } from './graphql/types/action';
import { Room as mongooseRoom } from './mongoose/types/Room';

db.once('open', () => {
  // we're connected!
  console.log('Connected to MongoDB');

  const server = new ApolloServer({
    typeDefs: [
      Query,
      Mutation,
      MutationResponse,
      Side,
      ActionType,
      Room,
      Game,
      Tile,
      Player,
      Action,
    ],
    resolvers: merge(
      {},
      mutationResponseResolvers,
      roomResolvers,
      gameResolvers,
      playerResolvers,
      tileResolvers,
      actionResolvers
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
