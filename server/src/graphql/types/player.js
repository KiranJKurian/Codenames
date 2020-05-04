const { Room } = require('../../mongoose/types/Room');
const { Sides } = require('../../constants');

const typeDef = `
  extend type Mutation {
    addPlayer(name: String! side: Side roomCode: String!): PlayerMutationResponse
    promotePlayer(name: String! roomCode: String!): PlayerMutationResponse
    demotePlayer(name: String! roomCode: String!): PlayerMutationResponse
    switchTeam(name: String! roomCode: String!): PlayerMutationResponse
    removePlayer(name: String! roomCode: String!): RemovePlayerMutationResponse
  }

  type PlayerMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    player: Player
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
    isMaster: Boolean!
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
        const player = await Room.findOne({ roomCode }, { players: { $elemMatch: { name } } })
          .then(room => {
            const {
              players: [playerToDemote],
            } = room;
            playerToDemote.isMaster = false;
            return room.save().then(() => playerToDemote);
          })
          .catch(() => null);

        if (player === null) {
          throw new Error(`Could not demote player ${name} of room ${roomCode}`);
        }

        return {
          code: '200',
          success: true,
          message: 'Demoted player',
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

    promotePlayer: async (_, { name, roomCode }) => {
      try {
        const player = await Room.findOne(
          { roomCode },
          { players: { $elemMatch: { isMaster: true } } }
        )
          .then(room => {
            if (room.players.length > 0) {
              throw new Error();
            }

            return Room.findOne({ roomCode }, { players: { $elemMatch: { name } } });
          })
          .then(room => {
            const {
              players: [playerToPromote],
            } = room;
            playerToPromote.isMaster = true;
            return room.save().then(() => playerToPromote);
          })
          .catch(() => null);

        if (player === null) {
          throw new Error(`Could not promote player ${name} of room ${roomCode}`);
        }

        return {
          code: '200',
          success: true,
          message: 'Promoted player',
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

    switchTeam: async (_, { name, roomCode }) => {
      try {
        const player = await Room.findOne({ roomCode }, { players: { $elemMatch: { name } } })
          .then(room => {
            const {
              players: [playerToSwitch],
            } = room;

            if (playerToSwitch.isMaster) {
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
