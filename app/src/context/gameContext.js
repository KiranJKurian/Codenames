import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const GameContext = React.createContext({
  player: null,
  setPlayer: () => {},
  team: null,
  setTeam: () => {},
  game: null,
  setGame: () => {},
  board: null,
  setBoard: () => {},
});

export const GameContextProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(null);

  return (
    <GameContext.Provider
      value={{
        player,
        setPlayer,
        team,
        setTeam,
        game,
        setGame,
        board,
        setBoard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.node,
};

GameContextProvider.defaultProps = {
  children: null,
};
