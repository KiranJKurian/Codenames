import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { RecoilRoot } from 'recoil';
import ApolloClient from 'apollo-boost';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { GRAPHQL_URI } from './constants';
import './App.css';
import LoginView from './views/LoginView';
import AppContainer from './styled/styled-components/AppContainer';
import GameBoardView from './views/GameBoardView';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => (
  <RecoilRoot>
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppContainer>
          <Router>
              <Switch>
              <Route exact path="/">
                  <LoginView />
                </Route>
                <Route path="/:roomCode">
                  <GameBoardView />
                </Route>
            </Switch>
          </Router>
        </AppContainer>
      </ThemeProvider>
    </ApolloProvider>
  </RecoilRoot>
);

export default App;
