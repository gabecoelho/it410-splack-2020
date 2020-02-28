const server = require('../src/server')
const Channel = require('../src/db-models/channel')
const mongoose = require('mongoose')
require('dotenv').config()

let listener

before(async () => {
  process.env.DB_NAME = 'test'
  listener = await server({ hideWarnings: true })
})

after(async () => {
  await Channel.deleteMany({})  // empty the channels collection
  listener.close()
  mongoose.connection.close()
})