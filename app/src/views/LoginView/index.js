import React from 'react';
import { Card, CardContent, Container } from '@material-ui/core';
import logo from '../../logo.svg';
import GameForm from '../../components/GameForm';
import LargeLogo from '../../styled-components/LargeLogo';
import CardHeaderWithBorderBottom from '../../styled-components/CardHeaderWithBorderBottom';

const LoginView = () => (
  <Container maxWidth="sm">
    <LargeLogo src={logo} alt="logo" />
    <Card>
      <CardHeaderWithBorderBottom title="Welcome! Please enter you game info" />
      <CardContent>
        <GameForm />
      </CardContent>
    </Card>
  </Container>
);

export default LoginView;
