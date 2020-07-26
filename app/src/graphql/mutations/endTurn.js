import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { GET_ROOM } from '#graphql/queries/getRoom';
import { nameState } from '#recoil/atoms';

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

export const useEndTurn = () => {
  const { roomCode } = useParams();
  const name = useRecoilValue(nameState);

  const [endTurn, ...endTurnOther] = useMutation(END_TURN, {
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

  const loadedEndTurn = () => endTurn({
    variables: { roomCode, name },
  });

  return [loadedEndTurn, ...endTurnOther];
};
