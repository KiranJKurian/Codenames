import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ROOM } from '#graphql/queries/getRoom';

export const SWITCH_TEAM = gql`
    mutation switchTeam($name: String! $roomCode: String!) {
        switchTeam(name: $name roomCode: $roomCode) {
            success
            message
            player {
                name
                side
            }
        }
    }
`;

export const useSwitchTeam = (roomCode, name) => useMutation(SWITCH_TEAM, {
    refetchQueries: ({ data: { switchTeam: { error, success } = {} } = {} } = {}) => {
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
