const messages = require('./messages')
const mongoose = require('mongoose')
const users = require('./users')

exports.definition = function () {
  return {
    name: String,
    description: String,
    members: [users.definition()],
    messages: [messages.definition()]
  }
}

const Channel = new mongoose.Schema(exports.definition())
exports.Channel = mongoose.model('Channel', Channel)