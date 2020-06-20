import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { usePromotePlayer } from '#graphql/mutations/promotePlayer';

const MasterSwitch = ({ masterRed, masterBlue, roomCode, name, team }) => {
    const [promotePlayer] = usePromotePlayer(roomCode, name);

    const handleChange = () => promotePlayer({
        variables: { roomCode, name },
    });

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
            onChange={handleChange}
            color={team === 'BLUE' ? 'primary' : 'secondary'}
            disabled={teamHasMaster}
          />
        }
        label="Spymaster"
      />
    );
};

export default MasterSwitch;
