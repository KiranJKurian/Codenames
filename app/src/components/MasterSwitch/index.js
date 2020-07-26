import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useRecoilValue } from 'recoil';
import { usePromotePlayer } from '#graphql/mutations/promotePlayer';
import { nameState } from '#recoil/atoms';
import { gameState, playerState } from '#recoil/selectors';
import { Sides } from '#constants';

const MasterSwitch = () => {
  const name = useRecoilValue(nameState);
  const { masterRed, masterBlue } = useRecoilValue(gameState);
  const { side } = useRecoilValue(playerState);
  const [promotePlayer] = usePromotePlayer();

  const teamHasMaster = (
    (side === Sides.RED && masterRed)
    || (side === Sides.BLUE && masterBlue)
  );

    return (
      <FormControlLabel
        control={
          <Switch
            name="masterSwitch"
            checked={masterRed === name || masterBlue === name}
            onChange={promotePlayer}
            color={side === Sides.BLUE ? 'primary' : 'secondary'}
            disabled={teamHasMaster}
          />
        }
        label="Spymaster"
      />
    );
};

export default MasterSwitch;
