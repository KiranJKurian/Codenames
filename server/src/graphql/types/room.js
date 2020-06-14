const { Room, createRoom } = require('../../mongoose/types/Room');

const typeDef = `
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
  }
`;

const resolvers = {
  Query: {
    room: async (_, { roomCode }) => Room.findOne({ roomCode }),
  },
  Mutation: {
    createRoom: async () => {
      try {
        const room = createRoom()
          .then(newRoom => newRoom.createGame())
          .catch(() => null);

        if (room === null) {
          throw new Error('Could not generate room and game');
        }

        return {
          code: 200,
          success: true,
          message: 'Created room',
          room,
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
  Room: {
    id: ({ _id: id }) => id,
    currentGame: ({ games }) => games[games.length - 1],
  },
};

module.exports = {
  typeDef,
  resolvers,
};
