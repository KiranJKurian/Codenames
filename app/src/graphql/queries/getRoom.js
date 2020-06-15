import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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

export const useRoom = (roomCode, name) =>
  useQuery(GET_ROOM, {
    variables: { roomCode, name },
    pollInterval: 3000,
  });
