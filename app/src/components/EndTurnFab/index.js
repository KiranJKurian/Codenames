import React from 'react';
import { Fab } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import styled from 'styled-components';

const DoneIconWithMargin = styled(DoneIcon)`
  margin-right: 8px;
`;

const FloatingActionButton = styled(Fab)`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

const EndTurnFab = ({ side }) => {

  return (
    <FloatingActionButton
      size="large"
      color={side === 'BLUE' ? 'primary' : 'secondary'}
      variant="extended"
      aria-labelledby="end-turn-fab"
    >
      <DoneIconWithMargin />
      <span id="end-turn-fab">End {side} Turn</span>
    </FloatingActionButton>
  );
};

export default EndTurnFab;
