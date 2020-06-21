const { Room } = require('../../mongoose/types/Room');
const { Sides } = require('../../constants');

export const createGame = async roomCode => {
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
};

export const endTurn = async (name, roomCode) => {
  try {
    const game = await Room.findOne(
      { roomCode },
      { games: { $slice: -1 }, players: { $elemMatch: { name } } }
    )
      .then(room => {
        const {
          players: [playerEndingTurn],
          games: [currentGame],
        } = room;

        if (playerEndingTurn.side !== currentGame.turn) {
          throw new Error();
        }
        currentGame.turn = currentGame.turn === Sides.RED ? Sides.BLUE : Sides.RED;
        return room.save().then(() => currentGame);
      })
      .catch(() => null);

    if (game === null) {
      throw new Error(`Could not end turn of player ${name} of room ${roomCode}`);
    }

    return {
      code: '200',
      success: true,
      message: 'Ended turn',
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
