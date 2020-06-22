import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useRecoilValue } from 'recoil';
import { usePromotePlayer } from '#graphql/mutations/promotePlayer';
import nameState from '#recoil/atoms/name';

const MasterSwitch = ({ masterRed, masterBlue, team }) => {
  const name = useRecoilValue(nameState);  
  const [promotePlayer] = usePromotePlayer();

    const teamHasMaster = (
        (team === 'RED' && masterRed)
        || (team === 'BLUE' && masterBlue)
    );

    return (
        <FormControlLabel
        control={
          <Switch
            name="masterSwitch"
            checked={masterRed === name || masterBlue === name}
            onChange={promotePlayer}
            color={team === 'BLUE' ? 'primary' : 'secondary'}
            disabled={teamHasMaster}
          />
        }
        label="Spymaster"
      />
    );
};

export default MasterSwitch;
