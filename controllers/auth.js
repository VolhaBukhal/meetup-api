const { status, errorMessage } = require('@constants')
const {
  getAllUsers,
  deleteRefreshToken,
  refreshTokenInDB,
} = require('@helpers/auth')
const cookie = require('cookie')

const logout = async (req, res, next) => {
  const { token: refreshToken } = cookie.parse(req.headers.cookie || '')
  const googleCookie = cookie.parse(req.headers.cookie || '')

  if (refreshToken) {
    const token = await deleteRefreshToken(refreshToken)
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        expires: new Date(0),
      })
    )
    res.json(token)
  } else if (googleCookie) {
    res.clearCookie('connect.sid', { path: '/' }).status(200).send('Ok')
  } else {
    req.logout((err) => {
      if (err) {
        return next(err)
      }
      res.redirect('/')
    })
  }
}

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

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.send(users)
  } catch (err) {
    res.status(status.error).json({ message: errorMessage })
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
  logout,
  refresh,
  getUsers,
  googleLogin,
}
