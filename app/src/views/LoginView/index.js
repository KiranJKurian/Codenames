import React from 'react';
import { Card, CardContent, Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import JoinGameForm from '#components/JoinGameForm';
import LargeLogo from '#sc/LargeLogo';
import CardHeaderWithBorderBottom from '#sc/CardHeaderWithBorderBottom';
import FadeIn from '#sc/FadeIn';
import logo from '../../logo.svg';

const NewGameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const AddIconWithMargin = styled(AddIcon)`
  margin-right: 8px;
`;

const LoginView = () => (
  <FadeIn>
    <Container maxWidth="sm">
      <LargeLogo src={logo} alt="logo" />
      <Card>
        <CardHeaderWithBorderBottom title="Join Game" />
        <CardContent>
          <JoinGameForm />
        </CardContent>
      </Card>
      <NewGameContainer>
        <Fab size="large" color="secondary" variant="extended" aria-labelledBy="createNewGame">
          <AddIconWithMargin />
          <span id="createNewGame">New Game</span>
        </Fab>
      </NewGameContainer>
    </Container>
  </FadeIn>
);

export default LoginView;
