require('./server')()
  .then(() => {
    console.log('Server ready and listening on port: ' + process.env.SERVER_PORT)
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })