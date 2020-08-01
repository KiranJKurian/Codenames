import mongoose from 'mongoose';
import { GameSchema } from './Game';
import { PlayerSchema } from './Player';
import { ActionSchema } from './Action';
import { initializeMethods } from '../methods/room';
import uniqueId from '../../utils/uniqueId';

const modelName = 'Room';

export const RoomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    validate: value => value.length === 4,
  },
  games: {
    type: [GameSchema],
    default: [],
  },
  players: {
    type: [PlayerSchema],
    default: [],
  },
  actions: {
    type: [ActionSchema],
    default: [],
  },
});

// Initializes RoomSchemas instance methods
initializeMethods(RoomSchema);

export const Room = mongoose.model(modelName, RoomSchema);

export const createRoom = () => {
  const roomCode = uniqueId();
  // insert room document, overwrite existing to prevent roomCode collision
  return Room.findOneAndUpdate(
    // query
    { roomCode },
    // new document
    { roomCode },
    { new: true, overwrite: true, upsert: true, useFindAndModify: false }
  );
};

export const findRoom = roomCode => Room.findOne({ roomCode });
