import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import nameState from '#recoil/atoms/name';

export const GET_ROOM = gql`
  query getRoom($roomCode: String!, $name: String) {
    room(roomCode: $roomCode, name: $name) {
      id
      roomCode
      games {
        id
        turn
        winner
        board {
          id
          word
          side
          picked
        }
        remainingRed
        remainingBlue
      }
      players {
        id
        name
        side
      }
      currentGame {
        id
        turn
        winner
        board {
          id
          word
          side
          picked
        }
        remainingRed
        masterRed
        remainingBlue
        masterBlue
      }
    }
  }
`;

export const useRoom = () => {
  const { roomCode } = useParams();
  const name = useRecoilValue(nameState);

  return useQuery(GET_ROOM, {
    variables: { roomCode, name },
    pollInterval: 3000,
  });
};
