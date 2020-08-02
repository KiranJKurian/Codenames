import { ActionTypes } from '../../constants';

const { Sides } = require('../../constants');

export const createGame = async (roomCode, Room) => {
  try {
    const game = Room.findOne({ roomCode })
      .then(room => room.createGame())
      .then(room => {
        const newGame = room.games[room.games.length - 1];
        room.addAction({ type: ActionTypes.NEW_GAME, gameId: newGame.id });

        return newGame;
      })
      .catch(e => {
        console.error(e);
        return null;
      });

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

export const endTurn = async (name, roomCode, Room) => {
  try {
    const game = await Room.findOne(
      { roomCode },
      { games: { $slice: -1 }, players: { $elemMatch: { name } }, actions: 1 }
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
        return room
          .save()
          .then(() =>
            room.addAction({
              type: ActionTypes.END_TURN,
              playerName: name,
              playerSide: playerEndingTurn.side,
            })
          )
          .then(() => currentGame);
      })
      .catch(e => {
        console.error(e);
        return null;
      });

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
