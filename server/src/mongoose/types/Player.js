const mongoose = require('mongoose');
const { Sides } = require('../../constants');

const playerSides = [Sides.RED, Sides.BLUE];

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: value => value.length > 0,
  },
  isMaster: {
    type: Boolean,
    default: false,
  },
  side: {
    type: String,
    required: true,
    validate: value => playerSides.includes(value),
  },
});

module.exports = {
  PlayerSchema,
};
