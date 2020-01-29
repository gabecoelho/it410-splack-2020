const express = require('express')
const path = require('path')

const app = express()
const port = 8000

app.all('/', (req, res, next) => {
  console.log('I received a request')
  next()
})

app.use(express.raw())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', (req, res, next) => {
  const body = req.body
  res.send(body)
})

app.use(express.static(__dirname))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))