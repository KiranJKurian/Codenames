import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { GET_ROOM } from '#graphql/queries/getRoom';
import nameState from '#recoil/atoms/name';

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

export const usePickTile = () => {
  const { roomCode } = useParams();
  const name = useRecoilValue(nameState);

  const [pickTile, ...pickTileOther] = useMutation(PICK_TILE, {
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

  const loadedPickTile = (word) => pickTile({
    variables: { roomCode, name, word },
  });

  return [loadedPickTile, ...pickTileOther];
};
