import React from 'react';
import { useSwitchTeam } from '#graphql/mutations/switchTeam';
import TeamSwitch from './TeamSwitch';

export default ({ disabled, team }) => {
  const [switchTeam] = useSwitchTeam();

  return (
    <TeamSwitch
      label="Team"
      checked={team === 'BLUE'}
      onChange={switchTeam}
      disabled={disabled}
    />
  );
};
