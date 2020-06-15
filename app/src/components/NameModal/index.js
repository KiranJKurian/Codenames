import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Modal } from '@material-ui/core';
import styled from 'styled-components';
import StretchedTextField from '#sc/StretchedTextField';
import StretchedButton from '#sc/StretchedButton';
import { GameContext } from '#context/gameContext';
import { useCreatePlayer } from '#graphql/mutations/createPlayer';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenteredModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SizedCard = styled(Card)`
  width: 90%;
  max-width: 500px;
  padding: 10px;
`;

const NameModal = ({ roomCode }) => {
  const [name, setName] = useState('');
  const { name: contextName, setName: setContextName } = useContext(
    GameContext,
  );
  const [createPlayer] = useCreatePlayer();

  const onChange = ({ target: { value } }) => {
    setName(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    createPlayer({
      variables: { roomCode, name },
    }).then(
      ({
        data: {
          addPlayer: { success, player: { name: playerName } = {} } = {},
        } = {},
      }) => {
        if (success) {
          setContextName(playerName);
        } else {
          window.alert(`Couldn't add player, try again later`);
        }
      },
    );
  };

  return (
    <CenteredModal
      aria-labelledby="name-title"
      aria-describedby="name"
      open={!contextName}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <SizedCard>
        <CardHeader id="name-title" title="What's your name?" />
        <CardContent>
          <form autoComplete="off" onSubmit={onSubmit}>
            <FormContainer>
              <StretchedTextField
                onChange={onChange}
                value={name}
                id="name"
                label="Name"
                variant="outlined"
                required
              />
              <StretchedButton
                color="primary"
                type="submit"
                variant="contained"
              >
                Submit
              </StretchedButton>
            </FormContainer>
          </form>
        </CardContent>
      </SizedCard>
    </CenteredModal>
  );
};

NameModal.propTypes = {
  roomCode: PropTypes.string,
};

NameModal.defaultProps = {
  roomCode: null,
};

export default NameModal;
