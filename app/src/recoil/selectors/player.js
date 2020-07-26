import { selector } from 'recoil';
import { playersState } from "./players";
import { nameState } from '../atoms';

export const playerState = selector({
  key: 'playerState',
  get: ({get}) => {
    const players = get(playersState);
    const name = get(nameState);
    return players.find(player => player.name === name) || {};
  },
});
