import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_ROOM } from '#graphql/queries/findRoom';
import JoinGameForm from './JoinGameForm';

const JoinGame = () => {
  const { push } = useHistory();
  const [roomCode, setRoomCode] = useState('');
  const [lastSubmittedRoomCode, setLastSubmittedRoomCode] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  // TODO: Add error state
  const [findRoom, { loading, data }] = useLazyQuery(FIND_ROOM);

  useEffect(() => {
    if (data?.room?.id) {
      push(data.room.roomCode);
    }
  }, [data, push]);

  const validLettersRoomCode = roomCode.match(/[a-z]/i);
  const validLengthRoomCode = roomCode.length === 4;
  const usingLastSubmittedRoomCode = data
    && data.room === null
    && lastSubmittedRoomCode === roomCode;

  const handleRoomCodeChange = ({ target: { value } }) => {
    if (value.length <= 4) {
      setRoomCode(value.toUpperCase());
    }
  };
  
  const errorRoomCode = !(validLettersRoomCode && validLengthRoomCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    if (!errorRoomCode && roomCode !== lastSubmittedRoomCode) {
      setLastSubmittedRoomCode(roomCode);
      findRoom({ variables: { roomCode } });
    }
  };

  let helperText = '';

  if (usingLastSubmittedRoomCode) {
    helperText = 'Couldn\'t find your room. Try a different room code.';
  }

  if (submitAttempted && errorRoomCode) {
    helperText = 'Please enter a valid 4-digit room code or create a new game.';
  }

  return (
    <JoinGameForm
      onSubmit={handleSubmit}
      error={submitAttempted && (errorRoomCode || usingLastSubmittedRoomCode)}
      onChange={handleRoomCodeChange}
      value={roomCode}
      loading={loading}
      helperText={helperText}
    />
  );
};

export default JoinGame;
