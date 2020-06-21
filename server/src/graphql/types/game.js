const { createGame, endTurn } = require('../mutations/game');

const typeDef = `
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

const resolvers = {
  Mutation: {
    createGame: async (_, { roomCode }) => createGame(roomCode),
    endTurn: async (_, { name, roomCode }) => endTurn(name, roomCode),
  },
  Game: {
    id: ({ _id: id }) => id,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
