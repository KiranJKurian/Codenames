const { Room } = require('../../mongoose/types/Room');
const { Sides } = require('../../constants');

const typeDef = `
  extend type Mutation {
    pickTile(name: String! word: String! roomCode: String!): TileMutationResponse
  }

  type TileMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    tile: Tile
  }

  type Tile {
    id: ID!
    word: String!
    side: Side!
    picked: Boolean!
  }
`;

const resolvers = {
  Mutation: {
    pickTile: async (_, { name, word, roomCode }) => {
      try {
        const tile = await Room.findOne(
          { roomCode },
          { games: { $slice: -1 }, players: { $elemMatch: { name } } }
        )
          .then(room => {
            const {
              players: [playerToValidate],
              games: [game],
            } = room;
            const { board, turn, winner } = game;

            const matchedTile = board.find(({ word: searchingWord }) => searchingWord === word);

            if (
              winner !== null ||
              playerToValidate.side !== turn ||
              playerToValidate.isMaster ||
              !matchedTile ||
              matchedTile.picked
            ) {
              throw new Error();
            }

            if (matchedTile.side === Sides.RED) {
              game.remainingRed -= 1;
              if (game.remainingRed === 0) {
                game.winner = Sides.RED;
              }
            } else if (matchedTile.side === Sides.BLUE) {
              game.remainingBlue -= 1;
              if (game.remainingBlue === 0) {
                game.winner = Sides.BLUE;
              }
            }

            if (turn === Sides.RED) {
              game.turn = Sides.BLUE;
            } else if (turn === Sides.BLUE) {
              game.turn = Sides.RED;
            }

            matchedTile.picked = true;
            room.markModified('games');
            return room.save().then(() => matchedTile);
          })
          .catch(() => null);

        if (tile === null) {
          throw new Error(`Could not pick tile ${word} of room ${roomCode}`);
        }

        return {
          code: '200',
          success: true,
          message: 'Picked tile',
          tile,
        };
      } catch (e) {
        return {
          code: '500',
          success: false,
          message: e.toString(),
        };
      }
    },
  },
  Tile: {
    id: ({ _id: id }) => id,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
