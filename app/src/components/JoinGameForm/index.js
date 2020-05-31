import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CenteredContainer from '#sc/CenteredContainer';
import StretchedTextField from '#sc/StretchedTextField';
import StretchedButton from '#sc/StretchedButton';
import { GameContext } from '#context/gameContext';
import { useCreatePlayer } from '#graphql/mutations/createPlayer';
import { useCreateGame } from '#graphql/mutations/createGame';

const JoinGameForm = () => {
  const { push } = useHistory();
  const {
    player,
    game,
    setGame,
  } = useContext(GameContext);

  const [createPlayer] = useCreatePlayer();

  const [createGame] = useCreateGame({
    onCompleted: () => {
      const gameTeam = game;
      createPlayer({
        variables: {
          player,
          team: gameTeam,
          game,
        },
      });
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
        <StretchedButton color="primary" type="submit" variant="outlined">
          Submit
        </StretchedButton>
      </CenteredContainer>
    </form>
  );
};

export default JoinGameForm;
