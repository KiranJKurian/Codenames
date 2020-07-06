const mongoose = require('mongoose');
const { Sides, ActionTypes } = require('../../constants');

const playerSides = [Sides.RED, Sides.BLUE];

export const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: value => value.length > 0,
  },
  side: {
    type: String,
    required: true,
    validate: value => playerSides.includes(value),
  },
});

export const playerActionValidations = {
  [ActionTypes.ADD_PLAYER]: (room, { playerName }) => {
    const valid = room.playerExists(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully added: ${playerName}`),
    };
  },
  [ActionTypes.REMOVE_PLAYER]: (room, { playerName }) => {
    const valid = !room.playerExists(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully removed: ${playerName}`),
    };
  },
  [ActionTypes.PROMOTE_PLAYER]: (room, { playerName }) => {
    const valid = room.playerExistsAndIsMaster(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully promoted: ${playerName}`),
    };
  },
  [ActionTypes.DEMOTE_PLAYER]: (room, { playerName }) => {
    const valid = room.playerExistsAndIsNotMaster(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully demoted: ${playerName}`),
    };
  },
  // Don't have the data of what the old team was so just checking if player exists
  [ActionTypes.SWITCH_TEAM]: (room, { playerName }) => {
    const valid = room.playerExists(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player does not exist: ${playerName}`),
    };
  },
  [ActionTypes.END_TURN]: (room, { playerName }) => {
    const valid = room.playerExistsAndIsNotPlayersTurn(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player did not end turn: ${playerName}`),
    };
  },
};
