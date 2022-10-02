const { status, errorMessage } = require('@constants')
const {
  getAllUsers,
  deleteRefreshToken,
  refreshTokenInDB,
} = require('@helpers/auth')

const logout = async (req, res) => {
  const { refreshToken } = req.cookies
  const token = await deleteRefreshToken(refreshToken)
  res.clearCookie('refreshToken')
  res.json(token)
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
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
  } catch {
    res.status(status.error).json({ message: errorMessage })
  }
}

module.exports = {
  logout,
  refresh,
  getUsers,
}
