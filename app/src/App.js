import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GRAPHQL_URI } from './constants';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import PlayerForm from './components/PlayerForm';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
});

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Codenames</p>
              </header>
              <PlayerForm />
              <Board />
            </div>
          </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
