import { selector } from 'recoil';
import { roomState } from '../atoms';

export const playersState = selector({
  key: 'playersState',
  get: ({get}) => {
    const room = get(roomState);
    return room?.players || [];
  },
});
