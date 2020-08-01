import mongoose from 'mongoose';
import { ActionTypes, Sides } from '../../constants';

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

export const tileActionValidations = {
  [ActionTypes.TILE_PICKED]: (room, { word }) => {
    const valid = room.wordExistsAndIsPicked(word);
    return {
      valid,
      error: valid ? null : new Error(`Word is not picked: ${word}`),
    };
  },
};
