const mongoose = require('mongoose');
const { Sides } = require('../../constants');

const TileSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    validate: value => value,
  },
  picked: Boolean,
  side: {
    type: String,
    required: true,
    validate: value => value in Sides,
  },
});

module.exports = {
  TileSchema,
};
