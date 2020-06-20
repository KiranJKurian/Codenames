import React from 'react';
import { useSwitchTeam } from '#graphql/mutations/switchTeam';
import TeamSwitch from './TeamSwitch';

export default ({ disabled, name, roomCode, team }) => {
  const [switchTeam] = useSwitchTeam(roomCode, name);

  const handleChange = () => switchTeam({
    variables: { roomCode, name },
  });

  return (
    <TeamSwitch
      label="Team"
      checked={team === 'BLUE'}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};
