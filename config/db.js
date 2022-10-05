const pkg = require('pg')

const { Pool } = pkg

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: 'meetups',
}

const proConfig = {
  connectionString: process.env.HEROKU_POSTGRESQL_MAROON_URL,
}

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
)

module.exports = { pool }
