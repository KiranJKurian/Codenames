import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_SCORE_AND_PICKED = gql`
  query getScoreAndPicked(
    $board: ID!
    $game: ID!
  ) {
    picked(board: $board) {
      tile
      side
    }
    game(game: $game) {
      teams {
        team
        score
      }
    }
  }
`;

export const useScoreAndPicked = (board, game, config) =>
  useQuery(GET_SCORE_AND_PICKED, {
    variables: { board, game },
    pollInterval: 3000,
    ...config,
  });
