const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  room: String,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
