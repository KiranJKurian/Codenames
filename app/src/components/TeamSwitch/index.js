import React from 'react';
import { useRecoilValue } from 'recoil';
import { useSwitchTeam } from '#graphql/mutations/switchTeam';
import { gameState, playerState } from '#recoil/selectors';
import { Sides } from '#constants';
import TeamSwitch from './TeamSwitch';

export default () => {
  const [switchTeam] = useSwitchTeam();
  const { masterRed, masterBlue } = useRecoilValue(gameState);
  const { side, name } = useRecoilValue(playerState);


  return (
    <TeamSwitch
      label="Team"
      checked={side === Sides.BLUE}
      onChange={switchTeam}
      disabled={masterRed === name || masterBlue === name}
    />
  );
};
