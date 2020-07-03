const mongoose = require('mongoose');
const { GameSchema, createGame, getCurrentGame } = require('./Game');
const { PlayerSchema, addPlayer } = require('./Player');
const uniqueId = require('../../utils/uniqueId');

const modelName = 'Room';

const RoomSchema = new mongoose.Schema({
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
});

RoomSchema.methods.createGame = createGame;

RoomSchema.methods.getCurrentGame = getCurrentGame;

RoomSchema.methods.addPlayer = addPlayer;

const Room = mongoose.model(modelName, RoomSchema);

const createRoom = () => {
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

const findRoom = roomCode => Room.findOne({ roomCode });

module.exports = {
  Room,
  RoomSchema,
  createRoom,
  findRoom,
};
