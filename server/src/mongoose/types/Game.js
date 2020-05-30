const mongoose = require('mongoose');
const { TileSchema } = require('./Tile');
const { generateTiles } = require('../../tiles');
const { defaultNumWords, Sides } = require('../../constants');

const GameSchema = new mongoose.Schema({
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
  remainingBlue: {
    type: Number,
    default: 0,
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

module.exports = {
  GameSchema,
};