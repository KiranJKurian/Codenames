import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { GET_ROOM } from '#graphql/queries/getRoom';
import { nameState } from '#recoil/atoms';

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

export const usePromotePlayer = () => {
  const { roomCode } = useParams();
  const name = useRecoilValue(nameState);

  const [promotePlayer, ...otherPromotePlayer] = useMutation(PROMOTE_PLAYER, {
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
  
  const loadedPromotePlayer = () => promotePlayer({
    variables: { roomCode, name },
  });

  return [loadedPromotePlayer, ...otherPromotePlayer];
};