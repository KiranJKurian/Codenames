import React from 'react';
import {
  Paper,
  makeStyles,
  Grid,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    height: '100%',
    padding: theme.spacing(4),
    width: '100%',
  },
}));

const Board = ({ codenames, onTileClick, player, isMaster }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {codenames.map(({ tile, word, side, picked }) => (
        <Grid key={tile} item xs={6} sm={4} md={3}>
          <Paper>
            <Button
              variant={picked ? 'contained' : 'outlined'}
              // eslint-disable-next-line no-nested-ternary
              color={side ? side === 'BLUE' ? 'primary' : 'secondary' : undefined}
              className={classes.button}
              disabled={!player}
              onClick={isMaster ? () => {} : onTileClick(tile)}
            >
              {word}
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
