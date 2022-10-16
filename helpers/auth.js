const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
const validateRefreshToken = (refreshToken) => {
  try {
    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    return userData
  } catch (err) {
    return null
  }
}

module.exports = {
  matchPassword,
  generateTokens,
  validateRefreshToken,
}
