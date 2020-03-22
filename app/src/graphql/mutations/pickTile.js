import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_SCORE_AND_PICKED } from '../queries/getScoreAndPicked';

export const PICK_TILE = gql`
  mutation pickTile($tile: ID! $player: ID!) {
    pick(
      tile: $tile
      player: $player
    ) {
      success
      status
      error
    }
  }
`;

export const usePickTile = (board, game) => useMutation(PICK_TILE, {
  refetchQueries: ({
    data: { pick: { error, success } = {} } = {},
  } = {}) => {
    if (error) {
      window.alert(error);
    }

    return success
      ? [
          {
            query: GET_SCORE_AND_PICKED,
            variables: { board, game },
          },
        ]
      : [];
  },
});
