const { Room } = require('../../mongoose/types/Room');

const typeDef = `
  extend type Mutation {
    createGame(roomCode: String!): GameMutationResponse
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
    createGame: async (_, { roomCode }) => {
      try {
        const game = Room.findOne({ roomCode })
          .then(room => room.createGame())
          .then(room => room.games[room.games.length - 1])
          .catch(() => null);

        if (game === null) {
          throw new Error(`Could not create game in room ${roomCode}`);
        }

        return {
          code: 200,
          success: true,
          message: 'Created game',
          game,
        };
      } catch (e) {
        return {
          code: 500,
          success: false,
          message: e.toString(),
        };
      }
    },
  },
  Game: {
    id: ({ _id: id }) => id,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
