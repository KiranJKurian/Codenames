// GraphQL endpoint
const DEV_GRAPHQL_URI = 'http://localhost:4000/graphql';
const PROD_GRAPHQL_URI = 'https://rmejnyteyj.execute-api.us-east-1.amazonaws.com/dev/graphql';

const development = process.env.REACT_APP_SERVER_ENV === 'LOCAL';

export const GRAPHQL_URI = development ? DEV_GRAPHQL_URI : PROD_GRAPHQL_URI;

export const Sides = Object.freeze({
  RED: 'RED',
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
  BLACK: 'BLACK',
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
