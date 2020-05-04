const defaultNumWords = 25;

const GameTypes = Object.freeze({
  CODENAMES: 'CODENAMES',
  DEEP_UNDERCOVER: 'DEEP_UNDERCOVER',
});

const Sides = Object.freeze({
  RED: 'RED',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
});

module.exports = {
  defaultNumWords,
  GameTypes,
  Sides,
};
