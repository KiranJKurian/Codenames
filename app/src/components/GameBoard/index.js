import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, useTheme } from '@material-ui/core';
import { usePickTile } from '#graphql/mutations/pickTile';
import { GameContext } from '#context/gameContext';
import { useRoom } from '#graphql/queries/getRoom';
import TeamSwitch from '#components/TeamSwitch';
import MasterSwitch from '#components/MasterSwitch';
import EndTurnFab from '#components/EndTurnFab';
import Board from '../Board';

const GameBoard = ({ roomCode }) => {
  const { name } = useContext(GameContext);

  const {
    loading: loadingTiles,
    error: errorTiles,
    data: { room } = {},
  } = useRoom(roomCode, name);

  const [pickTile] = usePickTile(roomCode, name);

  const {
    palette: {
      primary: {
        main: primary,
        dark: primaryDark,
      },
      secondary: {
        main: secondary,
        dark: secondaryDark,
      },
    },
  } = useTheme();

  const {
    players = [],
    currentGame: {
      turn,
      winner,
      board: tiles = [],
      remainingRed = -1,
      masterRed,
      remainingBlue = -1,
      masterBlue,
    } = {},
  } = room || {};

  const player = players.find(({ name: playerName }) => playerName === name) || {};

  if (errorTiles) {
    return <div>Oops, looks like we got an error. Please try again later</div>;
  }

  if (loadingTiles) {
    return <div>Loading...</div>;
  }

  const handleTileClick = word => () => {
    pickTile({
      variables: { roomCode, name, word },
    });
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <TeamSwitch 
              disabled={masterRed === name || masterBlue === name}
              roomCode={roomCode}
              name={name}
              team={player.side}
            />
            <MasterSwitch
              masterRed={masterRed}
              masterBlue={masterBlue}
              roomCode={roomCode}
              name={name}
              team={player.side}
            />
          </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h4 style={{ color: turn === 'BLUE' ? primary : primaryDark }}>
                Blue: {remainingBlue} Left
              </h4>
              <h4 style={{ color: turn === 'RED' ? secondary : secondaryDark }}>
                Red: {remainingRed} Left
              </h4>
            </div>
            <Board
              onTileClick={handleTileClick}
              codenames={tiles}
            />
          </Grid>
        </Grid>
      </Grid>
      {turn === player.side && <EndTurnFab side={player.side} />}
    </Grid>
  );
};

GameBoard.propTypes = {
  roomCode: PropTypes.string,
};

GameBoard.defaultProps = {
  roomCode: null,
};

export default GameBoard;
