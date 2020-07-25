import React, { useState, useEffect, useRef } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useRecoilValue } from 'recoil';
import { ActionTypes, Sides } from '#constants';
import { actionState, playersState } from '#recoil/selectors';

const ActionSnack = () => {
  const { id, playerName, type } = useRecoilValue(actionState);

  const players = useRecoilValue(playersState);
  const player = players.find(playerToSearch => playerToSearch.name === playerName);
  
  const [actionUpdated, setActionUpdated] = useState(false);
  const prevAction = useRef(id);

  useEffect(() => {
    if (id && prevAction.current && id !== prevAction.current) {
      setActionUpdated(true);
    }
    prevAction.current = id;
  }, [id]);

  let actionMessage;

  switch (type) {
    case ActionTypes.ADD_PLAYER:
      actionMessage = (<><span style={{ color: player.side === Sides.RED ? 'red' : 'blue' }}>{playerName}</span> has joined</>);
      break;
    default:
      actionMessage = type;
  }

  const handleClose = () => setActionUpdated(false);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={actionMessage && actionUpdated}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="info" icon={false}>
        {actionMessage}
      </Alert>
    </Snackbar>
  );
};

export default ActionSnack;
