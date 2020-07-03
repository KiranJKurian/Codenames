import mongoose from 'mongoose';
import { playerActionValidations } from './Player';
import { ActionTypes } from '../../constants';
import { gameActionValidations } from './Game';
import { tileActionValidations } from './Tile';

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

// Actions must be created AFTER the db is updated with the new data
export function addAction(action) {
  const { type } = action;
  // Action Validations
  const validations = {
    ...playerActionValidations,
    ...gameActionValidations,
    ...tileActionValidations,
  };

  const validation = validations[type];

  if (!validation) {
    throw new Error(`Invalid action type: ${type}`);
  }

  const { valid, error } = validation(action);

  if (!valid) {
    throw error;
  }

  this.actions.push(action);

  return this.save().then(() => this.actions[this.actions.length - 1]);
}
