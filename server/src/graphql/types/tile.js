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
    pickTile: async (_, { name, word, roomCode }) => pickTile(name, word, roomCode),
  },
  Tile: {
    id: ({ _id: id }) => id,
    side: ({ side, picked }, _, { player, currentGame = {} }) => {
      if (picked) {
        return side;
      }

      if (
        currentGame.winner ||
        (player &&
          (player.name === currentGame.masterRed || player.name === currentGame.masterBlue))
      ) {
        return side;
      }
      return null;
    },
  },
};
