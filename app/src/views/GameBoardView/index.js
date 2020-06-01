import React from 'react';
import { Container, Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AppBarWithLogout from '#components/AppBarWithLogout';
import GameBoard from '#components/GameBoard';

const GameBoardView = () => {
  const { roomCode } = useParams();

  return (
    <>
      <AppBarWithLogout />
      <Container>
        <Box my={10}>
          <GameBoard roomCode={roomCode} />
        </Box>
      </Container>
    </>
  );
};

export default GameBoardView;
