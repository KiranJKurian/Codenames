import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const GameContext = React.createContext({
  name: '',
  setName: () => {},
});

export const GameContextProvider = ({ children }) => {
  const [name, setName] = useState('');

  return (
    <GameContext.Provider
      value={{
        name,
        setName,
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
