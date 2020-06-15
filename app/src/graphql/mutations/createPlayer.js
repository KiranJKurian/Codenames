import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export const CREATE_PLAYER = gql`
  mutation addPlayer($name: String!, $roomCode: String!) {
    addPlayer(name: $name, roomCode: $roomCode) {
      code
      success
      message
      player {
        name
        side
      }
    }
  }
`;

export const useCreatePlayer = () => useMutation(CREATE_PLAYER);
