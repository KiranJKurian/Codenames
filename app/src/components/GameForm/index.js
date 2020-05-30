import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, MenuItem } from '@material-ui/core';
import CenteredContainer from '../../styled-components/CenteredContainer';
import StretchedTextField from '../../styled-components/StretchedTextField';
import StretchedButton from '../../styled-components/StretchedButton';
import StretchedSelect from '../../styled-components/StretchedSelect';
import { GameContext } from '../../context/gameContext';
import { useCreatePlayer } from '../../graphql/mutations/createPlayer';
import { useCreateGame } from '../../graphql/mutations/createGame';

const GameForm = () => {
  const { push } = useHistory();
  const {
    player,
    setPlayer,
    setTeam,
    game,
    setGame,
  } = useContext(GameContext);

  const [team, setPlayerTeam] = useState("RED");

  const [createPlayer] = useCreatePlayer();

  const [createGame] = useCreateGame({
    onCompleted: () => {
      const gameTeam = `${game}-${team}`;
      createPlayer({
        variables: {
          player,
          team: gameTeam,
          game,
        },
      });
      setTeam(gameTeam);
      push(`${game}/${player}`);
    },
  });

  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        createGame({ variables: { game }});
      }}
    >
      <CenteredContainer maxWidth="sm">
        <StretchedTextField
          onChange={({ target: { value } }) => setGame(value)}
          value={game || ''}
          id="game-field"
          label="Game code"
          required
        />
        <StretchedTextField
          onChange={({ target: { value } }) => setPlayer(value)}
          value={player || ''}
          id="player-field"
          label="Player name"
          required
        />
        <FormControl required>
          <StretchedSelect
            onChange={({ target: { value } }) => setPlayerTeam(value)}
            value={team}
            id="team-field"
            label="Team"
          >
            <MenuItem value="RED">Red</MenuItem>
            <MenuItem value="BLUE">Blue</MenuItem>
          </StretchedSelect>
        </FormControl>
        <StretchedButton color="primary" type="submit" variant="outlined">
          Submit
        </StretchedButton>
      </CenteredContainer>
    </form>
  );
};

export default GameForm;
