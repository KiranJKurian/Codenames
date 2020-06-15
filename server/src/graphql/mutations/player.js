const { Room } = require('../../mongoose/types/Room');
const { Sides } = require('../../constants');

export const addPlayer = async (name, side = null, roomCode) => {
  try {
    // If extra logic is needed reimplement Room.methods.addPlayer
    const newPlayer = await Room.findOne({ roomCode })
      .then(room => {
        return room.players.find(player => player.name === name) || room.addPlayer(name, side);
      })
      .catch(() => null);

    if (newPlayer === null) {
      throw new Error(`Could not add player to room ${roomCode}`);
    }

    return {
      code: '200',
      success: true,
      message: 'Created player',
      player: newPlayer,
    };
  } catch (e) {
    return {
      code: '500',
      success: false,
      message: e.toString(),
    };
  }
};

export const demotePlayer = async (name, roomCode) => {
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
};

export const promotePlayer = async (name, roomCode) => {
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
};

export const switchTeam = async (name, roomCode) => {
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
};

export const removePlayer = async (name, roomCode) => {
  try {
    demotePlayer(name, roomCode);

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
};
