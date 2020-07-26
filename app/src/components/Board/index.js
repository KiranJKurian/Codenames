import React from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { usePickTile } from '#graphql/mutations/pickTile';
import { gameState } from '#recoil/selectors';

const StyledButton = styled(Button)`
  height: 100%;
  padding: ${props => props.theme.spacing(4)}px;
  width: 100%;
`;

const sideColor = {
  BLUE: 'primary',
  RED: 'secondary',
  YELLOW: undefined,
};

const Board = () => {
  const [pickTile] = usePickTile();
  const { board: codenames = [] } = useRecoilValue(gameState);

  const handleTileClick = word => () => {
    pickTile(word);
  };

  return (
    <Grid container spacing={3}>
      {codenames.map(({ id, word, side, picked }) => (
        <Grid key={id} item xs={6} sm={4} md={3}>
          <Paper>
            <StyledButton
              variant={picked ? 'contained' : 'outlined'}
              color={sideColor[side]}
              onClick={handleTileClick(word)}
            >
              {word}
            </StyledButton>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
