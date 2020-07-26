import React, { useState, useEffect, useRef } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useRecoilValue } from 'recoil';
import { actionState } from '#recoil/selectors';
import useActionMessage from './useActionMessage';

const ActionSnack = () => {
  const { id } = useRecoilValue(actionState);

  const [actionUpdated, setActionUpdated] = useState(false);
  const prevAction = useRef(id);

  useEffect(() => {
    if (id && prevAction.current && id !== prevAction.current) {
      setActionUpdated(true);
    }
    prevAction.current = id;
  }, [id]);

  const actionMessage = useActionMessage();

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
