import mongoose from 'mongoose';
import { ActionTypes, PlayerSides } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export const ActionSchema = new mongoose.Schema({
  playerName: {
    type: String,
  },
  playerSide: {
    type: String,
    required: false,
    validate: value => PlayerSides.includes(value),
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
