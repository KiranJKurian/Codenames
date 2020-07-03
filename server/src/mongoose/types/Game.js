import { ActionTypes } from '../../constants';

const mongoose = require('mongoose');
const { TileSchema } = require('./Tile');
const { generateTiles } = require('../../tiles');
const { defaultNumWords, Sides } = require('../../constants');

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

export function createGame() {
  this.games.push({});
  this.games[this.games.length - 1].createBoard();
  return this.save();
}

export function getCurrentGame() {
  return this.games[this.games.length - 1];
}

function gameExists(gameId) {
  return this.games.some(({ id }) => id === gameId);
}

export const gameActionValidations = {
  [ActionTypes.NEW_GAME]: ({ gameId }) => {
    const valid = gameExists(gameId);
    return {
      valid,
      error: valid ? null : new Error(`Game does not exist: ${gameId}`),
    };
  },
};
