const { Room } = require('../../mongoose/types/Room');
const { Sides } = require('../../constants');

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
    addPlayer: async (_, { name, side = null, roomCode }) => {
      try {
        // If extra logic is needed reimplement Room.methods.addPlayer
        const player = await Room.findOne({ roomCode })
          .then(room => room.addPlayer(name, side))
          .catch(() => null);

        if (player === null) {
          throw new Error(`Could not add player to room ${roomCode}`);
        }

        return {
          code: '200',
          success: true,
          message: 'Created player',
          player,
        };
      } catch (e) {
        return {
          code: '500',
          success: false,
          message: e.toString(),
        };
      }
    },

    demotePlayer: async (_, { name, roomCode }) => {
      try {
        const game = await Room.findOne(
          { roomCode },
          { games: { $slice: -1 }, players: { $elemMatch: { name } } }
        )
          .then(room => {
            const {
              players: [playerToDemote],
              games: [currentGame],
            } = room;
            if (playerToDemote.side === Sides.RED && currentGame.masterRed === name) {
              currentGame.masterRed = null;
            } else if (playerToDemote.side === Sides.BLUE && currentGame.masterBlue === name) {
              currentGame.masterBlue = null;
            }
            return room.save().then(() => currentGame);
          })
          .catch(() => null);

        if (game === null) {
          throw new Error(`Could not demote player ${name} of room ${roomCode}`);
        }

        return {
          code: '200',
          success: true,
          message: 'Demoted player',
          game,
        };
      } catch (e) {
        return {
          code: '500',
          success: false,
          message: e.toString(),
        };
      }
    },

    promotePlayer: async (_, { name, roomCode }) => {
      try {
        const game = await Room.findOne(
          { roomCode },
          { games: { $slice: -1 }, players: { $elemMatch: { name } } }
        )
          .then(room => {
            const {
              players: [playerToPromote],
              games: [currentGame],
            } = room;
            if (playerToPromote.side === Sides.RED) {
              if (currentGame.masterRed !== null) {
                throw new Error(
                  `Could not promote player ${name} of room ${roomCode}. Another master for team ${playerToPromote.side} currently exists: ${currentGame.masterRed}`
                );
              }
              currentGame.masterRed = name;
            } else if (playerToPromote.side === Sides.BLUE) {
              if (currentGame.masterBlue !== null) {
                throw new Error(
                  `Could not promote player ${name} of room ${roomCode}. Another master for team ${playerToPromote.side} currently exists: ${currentGame.masterBlue}`
                );
              }
              currentGame.masterBlue = name;
            }

            return room.save().then(() => currentGame);
          })
          .catch(() => null);

        if (game === null) {
          throw new Error(`Could not promote player ${name} of room ${roomCode}`);
        }

        return {
          code: '200',
          success: true,
          message: 'Promoted player',
          game,
        };
      } catch (e) {
        return {
          code: '500',
          success: false,
          message: e.toString(),
        };
      }
    },

    switchTeam: async (_, { name, roomCode }) => {
      try {
        const player = await Room.findOne(
          { roomCode },
          { games: { $slice: -1 }, players: { $elemMatch: { name } } }
        )
          .then(room => {
            const {
              players: [playerToSwitch],
              games: [currentGame],
            } = room;

            if (currentGame.masterRed === name || currentGame.masterBlue === name) {
              throw new Error();
            }
            playerToSwitch.side = playerToSwitch.side === Sides.RED ? Sides.BLUE : Sides.RED;
            return room.save().then(() => playerToSwitch);
          })
          .catch(() => null);

        if (player === null) {
          throw new Error(`Could not switch player ${name} of room ${roomCode}`);
        }

        return {
          code: '200',
          success: true,
          message: "Switched player's team",
          player,
        };
      } catch (e) {
        return {
          code: '500',
          success: false,
          message: e.toString(),
        };
      }
    },

    removePlayer: async (_, { name, roomCode }) => {
      try {
        const player = await Room.findOneAndUpdate(
          { roomCode },
          { $pull: { players: { name } } },
          { useFindAndModify: false }
        ).catch(e => {
          console.log(e);
          return null;
        });

        if (player === null) {
          throw new Error();
        }

        return {
          code: '200',
          success: true,
          message: 'Removed player',
        };
      } catch (e) {
        console.error(e);
        return {
          code: '500',
          success: false,
          message: `Could not remove player ${name} of room ${roomCode}`,
        };
      }
    },
  },
  Player: {
    id: ({ _id: id }) => id,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
