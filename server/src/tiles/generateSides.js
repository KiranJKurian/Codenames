const { defaultNumWords, Sides } = require('../constants');
const shuffle = require('../utils/shuffle');

const generateSides = (numSides = defaultNumWords) => {
  const sides = new Array(numSides);

  const blues = Math.floor(numSides / 3);
  const reds = numSides % 3 ? blues + 1 : blues;

  sides.fill(Sides.BLUE, 0, blues);
  sides.fill(Sides.RED, blues, blues + reds);
  sides.fill(Sides.YELLOW, blues + reds, numSides - 1);
  sides.fill(Sides.BLACK, numSides - 1);

  return shuffle(sides);
};

module.exports = generateSides;
