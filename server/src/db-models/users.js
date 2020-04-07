const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Error = require('../error-plus')

const saltRounds = 10

const schema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
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

schema.statics.authenticate = async function (email, password) {
  const users = await Users.find({ email })
  if (!users.length) return false

  const user = users[0]
  const match = await bcrypt.compare(password, user.password)
  return match
}

schema.statics.create = async function (email, password) {
  const users = await Users.find({ email })
  if (users.length) {
    throw new Error('A user with this email already exists', 'EUEXIST')
  }

  const user = new Users({
    email,
    password: await bcrypt.hash(password, saltRounds)
  })
  return user.save()
}

const Users = mongoose.model('Users', schema)

module.exports = Users