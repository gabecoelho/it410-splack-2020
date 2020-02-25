const mongoose = require('mongoose')

exports.definition = function () {
  return {
    email: String,
    name: String,
    avatar: String
  }
}

const User = new mongoose.Schema(exports.definition())
exports.User = mongoose.model('User', User)