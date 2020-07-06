import mongoose from 'mongoose';
import { ActionTypes } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export const ActionSchema = new mongoose.Schema({
  playerName: {
    type: String,
  },
  gameId: {
    type: String,
  },
  word: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    validate: value => value in ActionTypes,
  },
});
