// GraphQL endpoint
// TODO: Check if env is prod
const production = true;
export const GRAPHQL_URI = production ? 'https://rmejnyteyj.execute-api.us-east-1.amazonaws.com/dev/graphql' : 'http://localhost:4000/graphql';

export const Sides = Object.freeze({
  RED: 'RED',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
});

export const ActionTypes = Object.freeze({
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  PROMOTE_PLAYER: 'PROMOTE_PLAYER',
  DEMOTE_PLAYER: 'DEMOTE_PLAYER',
  NEW_GAME: 'NEW_GAME',
  TILE_PICKED: 'TILE_PICKED',
  SWITCH_TEAM: 'SWITCH_TEAM',
  END_TURN: 'END_TURN',
});
