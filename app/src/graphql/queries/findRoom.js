import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const FIND_ROOM = gql`
  query findRoom($roomCode: String!) {
    room(roomCode: $roomCode) {
      id
      roomCode
    }
  }
`;

export const useFindRoom = roomCode => useQuery(FIND_ROOM, {
  variables: { roomCode },
});
