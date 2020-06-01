import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const GET_ROOM = gql`
  query getRoom($roomCode: String!) {
    room(roomCode: $roomCode) {
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
        isMaster
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
        remainingBlue
      }
    }
  }
`;

export const useRoom = roomCode => useQuery(GET_ROOM, {
  variables: { roomCode },
  pollInterval: 3000,
});
