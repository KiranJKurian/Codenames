import { createGame, endTurn } from '../mutations/game';

export const typeDef = `
  extend type Mutation {
    createGame(roomCode: String!): GameMutationResponse
    endTurn(name: String! roomCode: String!): GameMutationResponse
  }

  type GameMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    game: Game
  }

  type Game {
    id: ID!
    turn: Side!
    winner: Side
    board: [Tile]!
    remainingRed: Int!
    masterRed: String
    remainingBlue: Int!
    masterBlue: String
  }
`;

export const resolvers = {
  Mutation: {
    createGame: async (_, { roomCode }, { Room }) => createGame(roomCode, Room),
    endTurn: async (_, { name, roomCode }, { Room }) => endTurn(name, roomCode, Room),
  },
  Game: {
    id: ({ _id: id }) => id,
  },
};
