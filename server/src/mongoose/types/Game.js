import mongoose from 'mongoose';

import { TileSchema } from './Tile';
import { generateTiles } from '../../tiles';
import { ActionTypes, defaultNumWords, Sides } from '../../constants';

export const GameSchema = new mongoose.Schema({
  turn: {
    type: String,
    validate: value => value in Sides,
    default: Sides.RED,
  },
  winner: {
    type: String,
    validate: value => value in Sides || value === null,
    default: null,
  },
  board: {
    type: [TileSchema],
    default: [],
  },
  remainingRed: {
    type: Number,
    default: 0,
  },
  masterRed: {
    type: String,
    default: null,
  },
  remainingBlue: {
    type: Number,
    default: 0,
  },
  masterBlue: {
    type: String,
    default: null,
  },
  // teams: [TeamSchema],
});

// Note: Not saving here, do that after calling createBoard
GameSchema.methods.createBoard = function createBoard(numTiles = defaultNumWords) {
  const tiles = generateTiles(numTiles);

  // Add tiles to board
  tiles.forEach(tile => {
    this.board.push({
      ...tile,
      picked: false,
    });
  });

  const numOfSide = sideToSearch => tiles.filter(({ side }) => side === sideToSearch).length;

  this.remainingRed += numOfSide(Sides.RED);
  this.remainingBlue += numOfSide(Sides.BLUE);
};

export const gameActionValidations = {
  [ActionTypes.NEW_GAME]: (room, { gameId }) => {
    const valid = room.gameExists(gameId);
    return {
      valid,
      error: valid ? null : new Error(`Game does not exist: ${gameId}`),
    };
  },
};
