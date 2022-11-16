const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
  }
)
