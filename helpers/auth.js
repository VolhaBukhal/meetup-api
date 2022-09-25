const { pool } = require ( '@config/db')
const { v4} = require ( 'uuid')
const bcrypt = require ( 'bcrypt')
const jwt = require ( 'jsonwebtoken')

const userExists = async (email) => {
  const data = await pool.query('SELECT * FROM users WHERE email=$1', [email])

  if (data.rowCount == 0) return false
  return data.rows[0]
}

const findUserById = async (id) => {
  const data = await pool.query('SELECT * FROM users WHERE user_id=$1', [id])

  if (data.rowCount == 0) return false
  return data.rows[0]
}

const createUser = async (email, password, role) => {
  const id = v4()
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const userRole = role ?? 'USER'

  const data = await pool.query(
    'INSERT INTO users(user_id, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, email, hash, userRole]
  )

  if (data.rowCount == 0) {
    return false
  }
  return data.rows[0]
}

const getAllUsers = async () => {
  const data = await pool.query('SELECT * FROM users')

  return data.rows
}

const matchPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword)
  return match
}

const generateTokens = async (id, roles) => {
  const payload = {
    id,
    roles,
  }

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '24h',
  })

  return { accessToken, refreshToken }
}

const saveToken = async (userId, refreshToken) => {
  const tokenData = await pool.query(
    'SELECT refresh_token FROM users WHERE user_id = $1',
    [userId]
  )

  if (tokenData.rowCount !== 0) {
    await pool.query('UPDATE users SET refresh_token = $1 WHERE user_id = $2', [
      refreshToken,
      userId,
    ])
  } else {
    console.log('there is not refresh token in db')
  }
}

const findToken = async (refreshToken) => {
  const tokenData = await pool.query(
    'SELECT * FROM users WHERE refresh_token = $1',
    [refreshToken]
  )
  return tokenData
}

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw Error('User is not authorized!')
  }

  const userData = validateRefreshToken(refreshToken)
  const tokenFromDB = await findToken(refreshToken)

  if (!userData || !tokenFromDB) {
    throw Error('User is not authorized')
  }

  const user = await findUserById(userData.id)
  const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
    userIsExist.user_id,
    userIsExist.role
  )
  res.send({ accessToken: accessToken })
  await saveToken(user.user_id, refreshToken)
}

const checkTokenIsExpired = (expireTime) => {
  if (Date.now() >= expireTime * 1000) {
    return false
  }
}

module.exports = {
  userExists,
  findUserById,
  createUser,
  getAllUsers,
  matchPassword,
  generateTokens,
  saveToken,
  findToken,
  refresh,
  checkTokenIsExpired
}
