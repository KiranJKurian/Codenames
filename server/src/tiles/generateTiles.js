const { defaultNumWords } = require('../constants');
const { getWords } = require('./words');
const generateSides = require('./generateSides');

const generateTiles = (numTiles = defaultNumWords) => {
  const words = getWords(numTiles);
  const sides = generateSides(words.length);

  return words.map((word, index) => ({
    word,
    side: sides[index],
  }));
};

module.exports = generateTiles;
