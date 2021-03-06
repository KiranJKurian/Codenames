import { selector } from 'recoil';
import { roomState } from '../atoms';

export const actionState = selector({
  key: 'actionState',
  get: ({get}) => {
    const room = get(roomState);
    return room?.lastAction || {};
  },
});
