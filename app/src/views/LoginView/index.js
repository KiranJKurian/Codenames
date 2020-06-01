import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import JoinGame from '#components/JoinGame';
import LargeLogo from '#sc/LargeLogo';
import FadeIn from '#sc/FadeIn';
import CreateNewGame from '#components/CreateNewGame';
import logo from '../../logo.svg';

const NewGameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const JoinGameContainer = styled.div`
  margin-top: 64px;
`;

const LoginView = () => (
  <FadeIn>
    <Container maxWidth="sm">
      <LargeLogo src={logo} alt="logo" />
      <JoinGameContainer>
        <JoinGame />
      </JoinGameContainer>
      <NewGameContainer>
        <CreateNewGame />
      </NewGameContainer>
    </Container>
  </FadeIn>
);

export default LoginView;
