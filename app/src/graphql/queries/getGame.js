import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_GAME = gql`
  query getGame($game: ID!) {
    game(game: $game) {
      game
      board {
        board
        tiles {
          tile
          word
        }
      }
      teams {
        team
        players {
          player
        }
        master {
          player
        }
        score
        side
      }
      turn
      winner {
        team
        score
        side
      }
    }
  }
`;

export const useGame = game =>
  useQuery(GET_GAME, {
    variables: { game },
  });
