import { ApolloServer } from 'apollo-server-lambda';
import { merge } from 'lodash';
import mongoose from 'mongoose';
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
import { RoomSchema } from './mongoose/types/Room';

const { MONGO_DB_URI } = process.env;

mongoose
  .connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MonogoDB'))
  .catch(e => console.error('Could not connect to MongoDB', e));

const RoomModel = mongoose.model('Room', RoomSchema);
console.log('Fetched Room Model');

export const server = new ApolloServer({
  typeDefs: [Query, Mutation, MutationResponse, Side, ActionType, Room, Game, Tile, Player, Action],
  resolvers: merge(
    {},
    mutationResponseResolvers,
    roomResolvers,
    gameResolvers,
    playerResolvers,
    tileResolvers,
    actionResolvers
  ),
  context: ({ event: { body } = {} }) => ({
    variables: (JSON.parse(body) || {}).variables,
    Room: RoomModel,
  }),
  playground: true,
  introspection: true,
});
