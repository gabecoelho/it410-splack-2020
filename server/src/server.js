const env = require('./env')
const express = require('express')
const Enforcer = require('openapi-enforcer-middleware')
const passport = require('./passport')
const path = require('path')
const mongoose = require('mongoose')

module.exports = function ({ hideWarnings = false } = {}) {
  // connect to mongoose
  const dbPromise = mongoose.connect(env.dbConnString, { useNewUrlParser: true, useUnifiedTopology: true })

  const app = express()
  app.use(express.json())

  const controllerDirectory = path.resolve(__dirname, 'controllers')
  const pathToOpenApiDoc = path.resolve(__dirname, '../openapi.yml')

  // Create an enforcer middleware instance
  const enforcer = new Enforcer(pathToOpenApiDoc)

  // This middleware will handle explicit mock requests.
  enforcer.mocks(null, false).catch(err => {
    if (!hideWarnings) console.error(err)
  })

  // This middleware will handle requests for real data.
  enforcer.controllers(controllerDirectory).catch(err => {
    if (!hideWarnings) console.error(err)
  })

  // This middleware will automatically run mocking if the controller could not produce a response.
  enforcer.mocks(null, true).catch(() => {})

  // serve docs
  app.use('/api/docs', express.static(path.resolve(__dirname, '..', 'docs')))

  // Add the enforcer middleware runner to the express app.
  app.use('/api', passport, enforcer.middleware())

  // serve front end static files
  app.use(express.static(path.resolve(__dirname, '..', 'www')))

  // Add error handling middleware
  app.use((err, req, res, next) => {
    // If the error was in the client's request then send back a detailed report
    if (err.statusCode >= 400 && err.statusCode < 500 && err.exception) {
      res.set('Content-Type', 'text/plain')
      res.status(err.statusCode)
      res.send(err.message)

    // If it's unsafe to send back detailed errors then send back limited error information
    } else {
      console.error(err.stack)
      res.sendStatus(err.statusCode || 500)
    }
  })

  const port = process.env.SERVER_PORT
  return new Promise((resolve, reject) => {
    const listener = app.listen(port, err => {
      if (err) return reject(err)
      dbPromise
        .then(() => {
          resolve(listener)
        })
        .catch(reject)
    })
  })

}