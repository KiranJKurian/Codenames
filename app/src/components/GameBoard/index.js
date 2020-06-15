import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useGame } from '#graphql/queries/getGame';
import { useScoreAndPicked } from '#graphql/queries/getScoreAndPicked';
import { usePickTile } from '#graphql/mutations/pickTile';
import { GameContext } from '#context/gameContext';
import { useRoom } from '#graphql/queries/getRoom';
import Board from '../Board';

const isPlayerMaster = (teams = [], player = null) =>
  teams.some(({ master }) => master && master.player === player);

const GameBoard = ({ roomCode }) => {
  const { name } = useContext(GameContext);

  const {
    loading: loadingTiles,
    error: errorTiles,
    data: { room } = {},
  } = useRoom(roomCode, name);

  const [pickTile] = usePickTile(roomCode, name);

  const {
    currentGame: {
      id,
      turn,
      winner,
      board: tiles = [],
      // board {
      //   id
      //   word
      //   side
      //   picked
      // }
      remainingRed,
      remainingBlue,
    } = {},
  } = room || {};

  // const {
  //   loading: loadingTiles,
  //   error: errorTiles,
  //   data: {
  //     game: {
  //       board: {
  //         board,
  //         tiles = [],
  //       } = {},
  //       teams = [],
  //     } = {},
  //   } = {},
  // } = useGame(game, isMaster);

  // useEffect(() => {
  //   setBoard(board);
  // }, [board, setBoard]);

  // useEffect(() => {
  //   setIsMaster(isPlayerMaster(teams, player));
  // }, [teams, player, setIsMaster]);

  // TODO: Might be better to check master and picked here since it polls and master won't be stale from above
  // const {
  //   loading: loadingPicked,
  //   error: errorPicked,
  //   data: {
  //     picked: pickedTiles = [],
  //     // game: {
  //     //   teams: {
  //     //     team,
  //     //     score,
  //     //   } = {},
  //     // } = {},
  //   } = {},
  // } = useScoreAndPicked(board, game, { skip: board === undefined });

  // const [pickTile] = usePickTile(board, game);

  if (errorTiles) {
    return <div>Oops, looks like we got an error. Please try again later</div>;
  }

  if (loadingTiles) {
    return <div>Loading...</div>;
  }

  // const codenames = tiles.reduce((acc, curr) => {
  //   const pickedTile = pickedTiles.find(({ tile }) => tile === curr.tile);
  //   const tile = { picked: false, side: null, ...curr };

  //   if (pickedTile) {
  //     tile.picked = true;
  //     tile.side = pickedTile.side;
  //   }

  //   return [
  //     ...acc,
  //     tile,
  //   ];
  // }, []);

  const handleTileClick = word => () => {
    console.log(`Selected ${word}`);
    pickTile({
      variables: { roomCode, name, word },
    });
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Board
              onTileClick={handleTileClick}
              codenames={tiles}
              // player={player}
            />
          </Grid>
        </Grid>
      </Grid>
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
