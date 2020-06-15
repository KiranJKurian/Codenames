const {
  addPlayer,
  demotePlayer,
  promotePlayer,
  switchTeam,
  removePlayer,
} = require('../mutations/player');

const typeDef = `
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

const resolvers = {
  Mutation: {
    addPlayer: async (_, { name, side = null, roomCode }) => addPlayer(name, side, roomCode),

    demotePlayer: async (_, { name, roomCode }) => demotePlayer(name, roomCode),

    promotePlayer: async (_, { name, roomCode }) => promotePlayer(name, roomCode),

    switchTeam: async (_, { name, roomCode }) => switchTeam(name, roomCode),

    removePlayer: async (_, { name, roomCode }) => removePlayer(name, roomCode),
  },
  Player: {
    id: ({ _id: id }) => id,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
