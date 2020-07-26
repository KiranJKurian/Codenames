import { selector } from 'recoil';
import { roomState } from '../atoms';

export const gameState = selector({
  key: 'gameState',
  get: ({get}) => {
    const room = get(roomState);
    return room?.currentGame || {};
  },
});
