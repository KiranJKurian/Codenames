import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export const CREATE_PLAYER = gql`
  mutation createPlayer(
    $player: ID!
    $team: ID!
    $game: ID!
  ) {
    player(
      player: $player
      team: $team
      game: $game
    ) {
      success
      status
      error
    }
  }
`;

export const useCreatePlayer = () => useMutation(CREATE_PLAYER);
