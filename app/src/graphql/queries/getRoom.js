import { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { roomState, nameState } from '#recoil/atoms';

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
      lastAction {
        id
        type
        playerName
        playerSide
        word
      }
    }
  }
`;

export const useRoom = () => {
  const { roomCode } = useParams();
  const name = useRecoilValue(nameState);
  const [recoilRoom, setRecoilRoom] = useRecoilState(roomState);

  const { data: { room } = {} } = useQuery(GET_ROOM, {
    variables: { roomCode, name },
    pollInterval: 3000,
  });

  useEffect(() => {
    setRecoilRoom(room);
  }, [room, setRecoilRoom]);

  return recoilRoom;
};
