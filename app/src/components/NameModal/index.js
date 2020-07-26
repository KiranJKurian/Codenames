import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Modal } from '@material-ui/core';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import StretchedTextField from '#sc/StretchedTextField';
import StretchedButton from '#sc/StretchedButton';
import { useCreatePlayer } from '#graphql/mutations/createPlayer';
import { nameState } from '#recoil/atoms';

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
  const [recoilName, recoilSetName] = useRecoilState(nameState);
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
          recoilSetName(playerName);
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
      open={!recoilName}
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
