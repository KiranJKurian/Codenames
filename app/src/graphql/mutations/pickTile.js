import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ROOM } from '#graphql/queries/getRoom';

export const PICK_TILE = gql`
  mutation pickTile($word: String!, $name: String!, $roomCode: String!) {
    pickTile(name: $name, roomCode: $roomCode, word: $word) {
      code
      success
      message
      tile {
        id
        word
        side
        picked
      }
    }
  }
`;

export const usePickTile = (roomCode, name) =>
  useMutation(PICK_TILE, {
    refetchQueries: ({ data: { pickTile: { error, success } = {} } = {} } = {}) => {
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
