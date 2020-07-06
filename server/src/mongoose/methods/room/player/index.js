/* eslint-disable no-param-reassign */
import { Sides } from '../../../../constants';

// All functions need to be added as Room methods
export function addPlayer(playerName, side = null) {
  let name = playerName;
  let attempt = 1;
  // Handle username collision
  while (this.playerExists(name)) {
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
  return this.playerExists(nameToSearch) && this.playerIsMaster(nameToSearch);
}

export function playerExistsAndIsNotMaster(nameToSearch) {
  return this.playerExists(nameToSearch) && this.playerIsNotMaster(nameToSearch);
}

export function playerExistsAndIsNotPlayersTurn(nameToSearch) {
  const currentGame = this.getCurrentGame();
  const player = this.findPlayer(nameToSearch);

  return player && currentGame.turn !== player.side;
}

export const initializePlayerMethods = RoomSchema => {
  RoomSchema.methods.addPlayer = addPlayer;
  RoomSchema.methods.playerExists = playerExists;
  RoomSchema.methods.findPlayer = findPlayer;
  RoomSchema.methods.playerIsMaster = playerIsMaster;
  RoomSchema.methods.playerIsNotMaster = playerIsNotMaster;
  RoomSchema.methods.playerExistsAndIsMaster = playerExistsAndIsMaster;
  RoomSchema.methods.playerExistsAndIsNotMaster = playerExistsAndIsNotMaster;
  RoomSchema.methods.playerExistsAndIsNotPlayersTurn = playerExistsAndIsNotPlayersTurn;
};
