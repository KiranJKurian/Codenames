/* eslint-disable no-param-reassign */
import { playerActionValidations } from '../../../types/Player';
import { gameActionValidations } from '../../../types/Game';
import { tileActionValidations } from '../../../types/Tile';

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

  const { valid, error } = validation(this, action);

  if (!valid) {
    throw error;
  }

  this.actions.push(action);

  return this.save().then(() => this.actions[this.actions.length - 1]);
}

export const initializeActionMethods = RoomSchema => {
  RoomSchema.methods.addAction = addAction;
};
