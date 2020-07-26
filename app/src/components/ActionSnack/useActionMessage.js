import React from 'react';
import { useRecoilValue } from 'recoil';
import { ActionTypes, Sides } from '#constants';
import { actionState, gameState } from '#recoil/selectors';
import TeamColor from '#components/TeamColor';

const useActionMessage = () => {
  const { playerName, playerSide, type, word } = useRecoilValue(actionState);

  const StyledPlayerName = (
    <TeamColor side={playerSide}>
      {playerName}
    </TeamColor>
  );

  const { board = [] } = useRecoilValue(gameState);
  const { side: tileSide } = board.find(tile => tile.word === word) || {};
  let StyledWord = word;
  if (tileSide === Sides.BLUE || tileSide === Sides.RED) {
    StyledWord = (
      <TeamColor side={tileSide}>
        {word}
      </TeamColor>
    );
  }

  switch (type) {
    case ActionTypes.ADD_PLAYER:
      return <>{StyledPlayerName} has joined</>;
    case ActionTypes.REMOVE_PLAYER:
      return <>{StyledPlayerName} has left</>;
    case ActionTypes.PROMOTE_PLAYER:
      return <>{StyledPlayerName} is now Spymaster</>;
    case ActionTypes.NEW_GAME:
      return 'New game started';
    case ActionTypes.TILE_PICKED:
      return <>{StyledPlayerName} picked {StyledWord}</>;
    case ActionTypes.SWITCH_TEAM:
      return <>{StyledPlayerName} switched teams</>;
    case ActionTypes.END_TURN:
      return <>{StyledPlayerName} ended {playerSide} turn</>;
    default:
      return null;
  }
};

export default useActionMessage;
