
const cookieParser = require('cookie-parser')
const env = require('./env')
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const session = require('express-session')
const MongoSession = require('connect-mongodb-session')(session)
const Users = require('./db-models/users')

const router = express.Router()
module.exports = router

// set up the mongo sesion store
const store = new MongoSession({
  uri: env.dbConnString,
  collection: 'sessions'
})
store.on('error', err => {
  console.error(err)
  process.exit(1)
})

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy({ usernameField: 'email' }, async function(email, password, done) {
  const success = await Users.authenticate(email, password)
  if (success) return done(null, { email })
  return done(null, false)
}));

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
  done(null, user.email)
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(id, done) {
  done(null, { email: id })
});

// tell the router to check for sessions and handle authentication
router.use(express.urlencoded({ extended: true }))
router.use(cookieParser())
router.use(session({
  secret: env.cookieSecret,
  resave: true,
  saveUninitialized: true,
  store
}));
router.use(passport.initialize())
router.use(passport.session())

// if it's an auth route then no session is required
router.use('/users', (req, res, next) => {
  req.noSessionRequired = true
  req.login = passport.authenticate('local')
  next()
})

// if no session or no session required then next middleware, otherwise send a 401
router.use((req, res, next) => {
  if (req.user || req.noSessionRequired) {
    next()
  } else {
    res.sendStatus(401)
  }
})