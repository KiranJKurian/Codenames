import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ROOM } from '#graphql/queries/getRoom';

export const END_TURN = gql`
  mutation endTurn($name: String! $roomCode: String!) {
    endTurn(name: $name roomCode: $roomCode) {
      code
      success
      message
      game {
        turn
      }
    }
  }
`;

export const useEndTurn = (roomCode, name) => useMutation(END_TURN, {
  refetchQueries: ({ data: { endTurn: { error, success } = {} } = {} } = {}) => {
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
