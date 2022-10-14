const { status, errorMessage } = require('@constants')
const { getAllUsers, refreshTokenInDB } = require('@helpers/auth')
const cookie = require('cookie')

const refresh = async (req, res, next) => {
  try {
    const { token: refreshToken } = cookie.parse(req.headers.cookie || '')
    if (!refreshToken) {
      return res.status(status.unauthorized).json({ message: 'Unauthorized!' })
    }
    const userData = await refreshTokenInDB(refreshToken)
    return res.json(userData)
  } catch (err) {
    next(err)
  }
}

const googleLogin = async (req, res) => {
  if (req.user) {
    res.redirect('http://localhost:3000/meetings')
  } else {
    res.status(status.unauthorized).json({ message: res.status })
  }
}

module.exports = {
  refresh,
  googleLogin,
}
