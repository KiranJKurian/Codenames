import React from 'react';
import { Container, Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useRoom } from '#graphql/queries/getRoom';
import AppBarWithLogout from '#components/AppBarWithLogout';
import GameBoard from '#components/GameBoard';
import NameModal from '#components/NameModal';

const GameBoardView = () => {
  const { roomCode } = useParams();
  // This will poll for room data
  useRoom();

  return (
    <>
      <NameModal roomCode={roomCode} />
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
