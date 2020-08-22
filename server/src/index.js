import { ApolloServer } from 'apollo-server';
import { merge } from 'lodash';
import mongoose from 'mongoose';
import { config } from 'dotenv';
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

config();

let cachedDb = null;
const cachedModels = {};

const connectToDatabase = () => {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return mongoose
    .connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(db => {
      cachedDb = db;
      return cachedDb;
    });
};

const getMongooseModel = (schemaName, schema) => {
  return connectToDatabase().then(() => {
    if (!cachedModels[schemaName]) {
      console.log(`=> caching model: ${schemaName}`);
      cachedModels[schemaName] = mongoose.model(schemaName, schema);
    } else {
      console.log(`=> using cached model: ${schemaName}`);
    }

    return cachedModels[schemaName];
  });
};

(async () => {
  const RoomModel = await getMongooseModel('Room', RoomSchema);
  console.log('Connected to MongoDB. Fetched Room Model');

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
    context: ({ req: { body: { variables } = {} } = {} }) => ({
      variables,
      Room: RoomModel,
    }),
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
