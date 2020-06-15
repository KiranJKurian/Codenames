import React from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useCreateRoom } from '#graphql/mutations/createRoom';

const AddIconWithMargin = styled(AddIcon)`
  margin-right: 8px;
`;

const CreateNewGame = () => {
  const [createRoom] = useCreateRoom();
  const { push } = useHistory();

  const handleClick = () => {
    createRoom().then(
      ({
        data: { createRoom: { success, room: { roomCode } = {} } = {} } = {},
      }) => {
        if (success) {
          push(roomCode);
        } else {
          window.alert(`Couldn't create new game`);
        }
      },
    );
  };

  return (
    <Fab
      size="large"
      color="secondary"
      variant="extended"
      aria-labelledby="createNewGame"
      onClick={handleClick}
    >
      <AddIconWithMargin />
      <span id="createNewGame">New Game</span>
    </Fab>
  );
};

export default CreateNewGame;
