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

export function playerExists(nameToSearch) {
  return this.players.some(({ name: currentPlayerName }) => currentPlayerName === nameToSearch);
}

export function findPlayer(nameToSearch) {
  return this.players.find(({ name: currentPlayerName }) => currentPlayerName === nameToSearch);
}

export function playerIsMaster(nameToSearch) {
  const currentGame = this.getCurrentGame();
  return currentGame.masterRed === nameToSearch || currentGame.masterBlue === nameToSearch;
}

export function playerIsNotMaster(nameToSearch) {
  const currentGame = this.getCurrentGame();
  return currentGame.masterRed !== nameToSearch && currentGame.masterBlue !== nameToSearch;
}

export function playerExistsAndIsMaster(nameToSearch) {
  return playerExists(nameToSearch) && playerIsMaster(nameToSearch);
}

export function playerExistsAndIsNotMaster(nameToSearch) {
  return playerExists(nameToSearch) && playerIsNotMaster(nameToSearch);
}

export function playerExistsAndIsNotPlayersTurn(nameToSearch) {
  const currentGame = this.getCurrentGame();
  const player = findPlayer(nameToSearch);

  return player && currentGame.turn !== player.side;
}

export const playerActionValidations = {
  [ActionTypes.ADD_PLAYER]: ({ playerName }) => {
    const valid = playerExists(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully added: ${playerName}`),
    };
  },
  [ActionTypes.REMOVE_PLAYER]: ({ playerName }) => {
    const valid = !playerExists(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully removed: ${playerName}`),
    };
  },
  [ActionTypes.PROMOTE_PLAYER]: ({ playerName }) => {
    const valid = playerExistsAndIsMaster(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully promoted: ${playerName}`),
    };
  },
  [ActionTypes.DEMOTE_PLAYER]: ({ playerName }) => {
    const valid = playerExistsAndIsNotMaster(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player not successfully demoted: ${playerName}`),
    };
  },
  // Don't have the data of what the old team was so just checking if player exists
  [ActionTypes.SWITCH_TEAM]: ({ playerName }) => {
    const valid = playerExists(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player does not exist: ${playerName}`),
    };
  },
  [ActionTypes.END_TURN]: ({ playerName }) => {
    const valid = playerExistsAndIsNotPlayersTurn(playerName);
    return {
      valid,
      error: valid ? null : new Error(`Player did not end turn: ${playerName}`),
    };
  },
};

export function addPlayer(playerName, side = null) {
  let name = playerName;
  let attempt = 1;
  // Handle username collision
  while (playerExists(name)) {
    name = `${playerName}${attempt}`;
    attempt += 1;
  }

  if (side === null) {
    const numReds = this.players.filter(({ side: playerSide }) => playerSide === Sides.RED).length;
    const numBlues = this.players.filter(({ side: playerSide }) => playerSide === Sides.BLUE)
      .length;

    this.players.push({ name, side: numReds > numBlues ? Sides.BLUE : Sides.RED });
  } else {
    this.players.push({ name, side });
  }

  return this.save().then(() => this.players[this.players.length - 1]);
}
