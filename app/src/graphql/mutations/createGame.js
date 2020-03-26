import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export const CREATE_GAME = gql`
  mutation createGame($game: ID!) {
    game(game: $game) {
      success
      status
      error
    }
  }
`;

export const useCreateGame = (config = {}) => useMutation(CREATE_GAME, config);
