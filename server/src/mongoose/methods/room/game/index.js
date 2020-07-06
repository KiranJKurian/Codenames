/* eslint-disable no-param-reassign */
export function createGame() {
  this.games.push({});
  this.games[this.games.length - 1].createBoard();
  return this.save();
}

export function getCurrentGame() {
  return this.games[this.games.length - 1];
}

export function gameExists(gameId) {
  return this.games.some(({ id }) => id === gameId);
}

export const initializeGameMethods = RoomSchema => {
  RoomSchema.methods.gameExists = gameExists;
  RoomSchema.methods.createGame = createGame;
  RoomSchema.methods.getCurrentGame = getCurrentGame;
};
