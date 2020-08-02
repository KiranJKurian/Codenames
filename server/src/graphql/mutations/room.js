import { createGame } from './game';

const createRoomMutation = async Room => {
  try {
    const room = Room.createRoom()
      .then(newRoom => {
        createGame(newRoom.roomCode, Room);
        return newRoom;
      })
      .catch(() => null);

    if (room === null) {
      throw new Error('Could not generate room and game');
    }

    return {
      code: 200,
      success: true,
      message: 'Created room',
      room,
    };
  } catch (e) {
    return {
      code: 500,
      success: false,
      message: e.toString(),
    };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createRoomMutation as createRoom };
