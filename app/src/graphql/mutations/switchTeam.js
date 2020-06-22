import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { GET_ROOM } from '#graphql/queries/getRoom';
import nameState from '#recoil/atoms/name';

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

export const useSwitchTeam = () => {
  const { roomCode } = useParams();
  const name = useRecoilValue(nameState);

  const [switchTeam, ...switchTeamOther] = useMutation(SWITCH_TEAM, {
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

  const loadedSwitchTeam = () => switchTeam({
    variables: { roomCode, name },
  });

  return [loadedSwitchTeam, ...switchTeamOther];
};