const sequelize = require('@config/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: true },
  refresh_token: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Meetup = sequelize.define('meetup', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
  time: { type: DataTypes.STRING },
  place: { type: DataTypes.STRING },
})

User.hasMany(Meetup)
Meetup.belongsTo(User)

Meetup.hasMany(User)
User.belongsTo(Meetup)

module.exports = {
  User,
  Meetup,
}
