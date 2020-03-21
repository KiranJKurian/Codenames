import React from 'react';
import {
  Paper,
  makeStyles,
  Grid,
  Button,
} from '@material-ui/core';

import { useGame } from '../../graphql/queries/getGame';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    hieght: '100%',
    padding: theme.spacing(4),
    width: '100%',
  },
}));

const Board = () => {
  const classes = useStyles();
  const {
    loading,
    error,
    data: {
      game: {
        board: {
          tiles = [],
        } = {},
      } = {},
    } = {},
  } = useGame("test");

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error, check logs';
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {tiles.map(({ tile, word, side }) => (
          <Grid key={tile} item xs={6} sm={4} md={3}>
            <Paper className={classes.paper}>
              <Button variant="outlined" color="primary" className={classes.button} onClick={() => console.log(`Selected ${tile} of ${side}`)}>
                {word}
                </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Board;
