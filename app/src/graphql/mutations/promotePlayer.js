import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ROOM } from '#graphql/queries/getRoom';

export const PROMOTE_PLAYER = gql`
  mutation promotePlayer($name: String! $roomCode: String!) {
    promotePlayer(name: $name roomCode: $roomCode) {
      success
      message
      game {
        id
        masterRed
        masterBlue
      }
    }
  }
`;

export const usePromotePlayer = (roomCode, name) => useMutation(PROMOTE_PLAYER, {
    refetchQueries: ({ data: { promotePlayer: { error, success } = {} } = {} } = {}) => {
      if (error) {
        window.alert(error);
      }

      return success
        ? [
            {
              query: GET_ROOM,
              variables: { roomCode, name },
            },
          ]
        : [];
    },
  });
