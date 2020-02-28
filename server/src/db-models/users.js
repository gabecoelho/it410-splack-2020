const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: String,
  name: String,
  avatar: String
})

schema.methods.toResult = function () {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    avatar: this.avatar
  }
}

module.exports = mongoose.model('User', schema)