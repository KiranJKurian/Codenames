import {
  addPlayer,
  demotePlayer,
  promotePlayer,
  switchTeam,
  removePlayer,
} from '../mutations/player';

export const typeDef = `
  extend type Mutation {
    addPlayer(name: String! side: Side roomCode: String!): PlayerMutationResponse
    promotePlayer(name: String! roomCode: String!): MasterMutationResponse
    demotePlayer(name: String! roomCode: String!): MasterMutationResponse
    switchTeam(name: String! roomCode: String!): PlayerMutationResponse
    removePlayer(name: String! roomCode: String!): RemovePlayerMutationResponse
  }

  type PlayerMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    player: Player
  }

  type MasterMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    game: Game
  }

  type RemovePlayerMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Player {
    id: ID!
    name: String!
    side: Side!
  }
`;

export const resolvers = {
  Mutation: {
    addPlayer: async (_, { name, side = null, roomCode }, { Room }) =>
      addPlayer(name, side, roomCode, Room),

    demotePlayer: async (_, { name, roomCode }, { Room }) => demotePlayer(name, roomCode, Room),

    promotePlayer: async (_, { name, roomCode }, { Room }) => promotePlayer(name, roomCode, Room),

    switchTeam: async (_, { name, roomCode }, { Room }) => switchTeam(name, roomCode, Room),

    removePlayer: async (_, { name, roomCode }, { Room }) => removePlayer(name, roomCode, Room),
  },
  Player: {
    id: ({ _id: id }) => id,
  },
};
