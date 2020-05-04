const mongoose = require('mongoose');
const uri = require('./mongodb-string.json');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
  db,
};
