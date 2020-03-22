import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GRAPHQL_URI } from './constants';
import './App.css';
import LoginView from './views/LoginView';
import { GameContextProvider } from './context/gameContext';
import AppContainer from './styled-components/AppContainer';
import GameBoardView from './views/GameBoardView';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

const App = () => (
  <GameContextProvider>
    <ApolloProvider client={client}>
      <CssBaseline />
      <AppContainer>
        <Router>
            <Switch>
            <Route exact path="/">
                <LoginView />
              </Route>
              <Route path="/:game/:player">
                <GameBoardView />
              </Route>
          </Switch>
        </Router>
      </AppContainer>
    </ApolloProvider>
  </GameContextProvider>
);

export default App;
