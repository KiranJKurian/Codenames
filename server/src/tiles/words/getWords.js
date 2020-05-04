const codenames = require('./codenames.json');
const deepUndercover = require('./deepUndercover.json');
const { defaultNumWords, GameTypes } = require('../../constants');

const getWords = (numWords = defaultNumWords, game = GameTypes.CODENAMES) => {
  let wordArray;

  if (game === GameTypes.CODENAMES) {
    wordArray = codenames;
  } else {
    wordArray = deepUndercover;
  }

  if (numWords >= wordArray.length) {
    if (numWords > wordArray.length) {
      console.warn(
        `WARNING: Requested ${numWords} words but ${game} only has ${wordArray.length} words!`
      );
    }
    return wordArray;
  }

  const words = new Set();

  while (words.size < numWords) {
    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    if (!words.has(randomWord)) {
      words.add(randomWord);
    }
  }

  return Array.from(words);
};

module.exports = getWords;
