require('dotenv').config()

const env = process.env;

exports.baseUrl = `${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}`

exports.cookieSecret = env.COOKIE_SECRET || 'this is a secret'

exports.db = {
  host: env.DB_HOST,
  name: env.DB_NAME,
  pass: env.DB_PASS,
  port: env.DB_PORT,
  user: env.DB_USER
}

const db = exports.db
Object.defineProperty(exports, 'dbConnString', {
  get () {
    return `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}?authSource=admin`
  }
})