import { createRoom } from '../mutations/room';
import { Room } from '../../mongoose/types/Room';

export const typeDef = `
  extend type Query {
    room(roomCode: String! name: String): Room
  }

  extend type Mutation {
    createRoom: RoomMutationResponse
  }

  type RoomMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    room: Room
  }

  type Room {
    id: ID!
    roomCode: String!
    games: [Game]!
    players: [Player]!
    currentGame: Game
    actions: [Action]
    lastAction: Action
  }
`;

export const resolvers = {
  Query: {
    room: async (_, { roomCode }) => Room.findOne({ roomCode }),
  },
  Mutation: {
    createRoom: async () => createRoom(),
  },
  Room: {
    id: ({ _id: id }) => id,
    currentGame: ({ games }) => games[games.length - 1],
    lastAction: ({ actions }) => actions[actions.length - 1],
  },
};
