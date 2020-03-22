import React from 'react';
import { Container, Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AppBarWithLogout from '../../components/AppBarWithLogout';
import GameBoard from '../../components/GameBoard';

const GameBoardView = () => {
  const { game, player } = useParams();

  return (
    <>
      <AppBarWithLogout />
      <Container>
        <Box my={10}>
          <GameBoard game={game} player={player} />
        </Box>
      </Container>
    </>
  );
};

export default GameBoardView;
