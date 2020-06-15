import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export const CREATE_ROOM = gql`
  mutation createRoom {
    createRoom {
      code
      success
      message
      room {
        roomCode
      }
    }
  }
`;

export const useCreateRoom = () => useMutation(CREATE_ROOM);
