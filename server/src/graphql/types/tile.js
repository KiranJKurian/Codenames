import { pickTile } from '../mutations/tile';

export const typeDef = `
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
    side: Side
    picked: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    pickTile: async (_, { name, word, roomCode }, { Room }) => pickTile(name, word, roomCode, Room),
  },
  Tile: {
    id: ({ _id: id }) => id,
    side: async ({ side, picked }, _, { Room, variables: { name, roomCode } = {} }) => {
      if (picked) {
        return side;
      }

      try {
        return await Room.findOne(
          { roomCode },
          { games: { $slice: -1 }, players: { $elemMatch: { name } } }
        )
          .then(room => {
            const {
              players: [player],
              games: [currentGame],
            } = room;

            if (
              currentGame.winner ||
              (player &&
                (player.name === currentGame.masterRed || player.name === currentGame.masterBlue))
            ) {
              return side;
            }
            return null;
          })
          .catch(() => null);
      } catch (e) {
        return null;
      }
    },
  },
};
