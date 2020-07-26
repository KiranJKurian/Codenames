import React from 'react';
import { Fab } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEndTurn } from '#graphql/mutations/endTurn';
import { playerState, gameState } from '#recoil/selectors';
import { Sides } from '#constants';

const DoneIconWithMargin = styled(DoneIcon)`
  margin-right: 8px;
`;

const FloatingActionButton = styled(Fab)`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

const EndTurnFab = () => {
  const { side } = useRecoilValue(playerState);
  const { turn } = useRecoilValue(gameState);
  const [endTurn] = useEndTurn();

  return turn === side && (
    <FloatingActionButton
      size="large"
      color={side === Sides.BLUE ? 'primary' : 'secondary'}
      variant="extended"
      aria-labelledby="end-turn-fab"
      onClick={endTurn}
    >
      <DoneIconWithMargin />
      <span id="end-turn-fab">End {side} Turn</span>
    </FloatingActionButton>
  );
};

export default EndTurnFab;
