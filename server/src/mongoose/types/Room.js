const mongoose = require('mongoose');
const { GameSchema } = require('./Game');
const { PlayerSchema } = require('./Player');
const uniqueId = require('../../utils/uniqueId');
const { Sides } = require('../../constants');

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

RoomSchema.methods.createGame = function createGame() {
  this.games.push({});
  this.games[this.games.length - 1].createBoard();
  return this.save();
};

RoomSchema.methods.getCurrentGame = function getCurrentGame() {
  return this.games[this.games.length - 1];
};

RoomSchema.methods.addPlayer = function addPlayer(playerName, side = null) {
  let name = playerName;
  let attempt = 1;
  const duplicate = nameToSearch =>
    this.players.some(({ name: currentPlayerName }) => currentPlayerName === nameToSearch);
  // Handle username collision
  while (duplicate(name)) {
    name = `${playerName}${attempt}`;
    attempt += 1;
  }

  if (side === null) {
    const numReds = this.players.filter(({ side: playerSide }) => playerSide === Sides.RED).length;
    const numBlues = this.players.filter(({ side: playerSide }) => playerSide === Sides.BLUE)
      .length;

    this.players.push({ name, side: numReds > numBlues ? Sides.BLUE : Sides.RED });
  } else {
    this.players.push({ name, side });
  }

  return this.save().then(() => this.players[this.players.length - 1]);
};

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
