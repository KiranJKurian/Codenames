import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Board from '../Board';
import { useGame } from '../../graphql/queries/getGame';
import { useScoreAndPicked } from '../../graphql/queries/getScoreAndPicked';
import { usePickTile } from '../../graphql/mutations/pickTile';
import { GameContext } from '../../context/gameContext';

const isPlayerMaster = (teams = [], player = null) => teams.some(({
  master,
}) => master && master.player === player);

const GameBoard = ({ game, player }) => {
  const { setBoard } = useContext(GameContext);
  const [isMaster, setIsMaster] = useState(false);

  const {
    loading: loadingTiles,
    error: errorTiles,
    data: {
      game: {
        board: {
          board,
          tiles = [],
        } = {},
        teams = [],
      } = {},
    } = {},
  } = useGame(game, isMaster);

  useEffect(() => {
    setBoard(board);
  }, [board, setBoard]);

  useEffect(() => {
    setIsMaster(isPlayerMaster(teams, player));
  }, [teams, player, setIsMaster]);

  // TODO: Might be better to check master and picked here since it polls and master won't be stale from above
  const {
    loading: loadingPicked,
    error: errorPicked,
    data: {
      picked: pickedTiles = [],
      // game: {
      //   teams: {
      //     team,
      //     score,
      //   } = {},
      // } = {},
    } = {},
  } = useScoreAndPicked(board, game, { skip: board === undefined });

  const [pickTile] = usePickTile(board, game);

  if (errorTiles || errorPicked) {
    return <div>Oops, looks like we got an error. Please try again later</div>;
  }

  if (loadingTiles || loadingPicked) {
    return <div>Loading...</div>;
  }

  const codenames = tiles.reduce((acc, curr) => {
    const pickedTile = pickedTiles.find(({ tile }) => tile === curr.tile);
    const tile = { picked: false, side: null, ...curr };

    if (pickedTile) {
      tile.picked = true;
      tile.side = pickedTile.side;
    }

    return [
      ...acc,
      tile,
    ];
  }, []);

  const handleTileClick = tile => () => {
    console.log(`Selected ${tile}`);
    pickTile({
      variables: { tile, player, game },
    });
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Board
              onTileClick={handleTileClick}
              codenames={codenames}
              player={player}
              isMaster={isMaster}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

GameBoard.propTypes = {
  game: PropTypes.string,
  player: PropTypes.string,
};

GameBoard.defaultProps = {
  game: null,
  player: null,
};

export default GameBoard;
