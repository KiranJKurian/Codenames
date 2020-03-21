import React, { useState } from 'react';
import { Container, TextField, Button, Paper, makeStyles, Select, MenuItem } from '@material-ui/core';

import { useCreatePlayer } from '../../graphql/mutations/createPlayer';

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
  },
}));

const PlayerForm = () => {
  const [playerName, setPlayerName] = useState('');
  const [team, setTeam] = useState('test-RED');
  const classes = useStyles();

  const [createPlayer] = useCreatePlayer();

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        console.log({ team, playerName });
        createPlayer({
          variables: { player: playerName, team },
        });
      }}
    >
      <Paper className={classes.paper}>
        <Container maxWidth="sm">
          <div>
            <TextField
              onChange={({ target: { value } }) => setPlayerName(value)}
              value={playerName}
              id="playerName-field"
              label="Player name"
              required
            />
            <Select
              onChange={({ target: { value } }) => setTeam(value)}
              value={team}
              id="team-field"
              label="Team"
              required
            >
              <MenuItem value="test-RED">Red</MenuItem>
              <MenuItem value="test-BLUE">Blue</MenuItem>
            </Select>
          </div>
          <Button color="primary" type="submit" variant="outlined">
            Submit
          </Button>
        </Container>
      </Paper>
    </form>
  );
};

export default PlayerForm;
