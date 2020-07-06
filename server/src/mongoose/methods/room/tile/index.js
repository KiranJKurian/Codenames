/* eslint-disable no-param-reassign */
export function wordExistsAndIsPicked(wordToSearch) {
  const currentGame = this.getCurrentGame();
  const pickedWord = currentGame.board.find(({ word }) => word === wordToSearch) || {};
  return pickedWord.picked;
}

export const initializeTileMethods = RoomSchema => {
  RoomSchema.methods.wordExistsAndIsPicked = wordExistsAndIsPicked;
};
