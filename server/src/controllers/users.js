const { baseUrl } = require('../env')
const Users = require('../db-models/users')

exports.createUser = async function (req, res) {
  const { email, password } = req.body
  try {
    await Users.create(email, password)
    res.status(201)
    res.set('location', baseUrl + '/api/users')
    res.end()
  } catch (err) {
    if (err.code === 'EUEXIST') {
      res.status(400).send('Email already registered')
    } else {
      res.sendStatus(500)
    }
  }
}

exports.login = function (req, res, next) {
  req.login(req, res, err => {
    if (err) return next(err)
    res.status(200).end()
  })
}

exports.logout = function (req, res) {
  req.logout()
  res.status(204).end()
}


