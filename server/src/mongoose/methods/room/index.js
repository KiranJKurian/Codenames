import { initializePlayerMethods } from './player';
import { initializeGameMethods } from './game';
import { initializeActionMethods } from './action';
import { initializeTileMethods } from './tile';

// eslint-disable-next-line import/prefer-default-export
export const initializeMethods = RoomSchema => {
  initializePlayerMethods(RoomSchema);
  initializeGameMethods(RoomSchema);
  initializeActionMethods(RoomSchema);
  initializeTileMethods(RoomSchema);
};
