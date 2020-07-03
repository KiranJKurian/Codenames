import { ActionTypes } from '../../constants';

const mongoose = require('mongoose');
const { Sides } = require('../../constants');

export const TileSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    validate: value => value,
  },
  picked: Boolean,
  side: {
    type: String,
    required: true,
    validate: value => value in Sides,
  },
});

function wordExistsAndIsPicked(wordToSearch) {
  const currentGame = this.getCurrentGame();
  const pickedWord = currentGame.board.find(({ word }) => word === wordToSearch) || {};
  return pickedWord.picked;
}

export const tileActionValidations = {
  [ActionTypes.TILE_PICKED]: ({ word }) => {
    const valid = wordExistsAndIsPicked(word);
    return {
      valid,
      error: valid ? null : new Error(`Word is not picked: ${word}`),
    };
  },
};
