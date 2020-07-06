import { ActionTypes } from '../../constants';

const { Room } = require('../../mongoose/types/Room');
const { Sides } = require('../../constants');

// eslint-disable-next-line import/prefer-default-export
export const pickTile = async (name, word, roomCode) => {
  try {
    let playerPicked = null;
    const tile = await Room.findOne(
      { roomCode },
      { games: { $slice: -1 }, players: { $elemMatch: { name } }, actions: 1 }
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
          game.masterRed === name ||
          game.masterBlue === name ||
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

        if (turn === Sides.RED && matchedTile.side !== Sides.RED) {
          game.turn = Sides.BLUE;
        } else if (turn === Sides.BLUE && matchedTile.side !== Sides.BLUE) {
          game.turn = Sides.RED;
        }

        matchedTile.picked = true;
        room.markModified('games');
        playerPicked = playerToValidate;
        return room
          .save()
          .then(() =>
            room.addAction({ type: ActionTypes.TILE_PICKED, word, playerName: playerPicked.name })
          )
          .then(() => matchedTile);
      })
      .catch(e => {
        console.error(e);
        return null;
      });

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
};
