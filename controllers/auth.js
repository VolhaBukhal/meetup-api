const { status, errorMessage , infoMessages } = require('@constants')
const {
  userExists,
  createUser,
  getAllUsers,
  matchPassword,
  generateTokens,
  saveToken,
  deleteRefreshToken,
  refreshTokenInDB
} = require('@helpers/auth')

const logout = async(req, res) => {
  const {refreshToken} = req.body;

  const token = await deleteRefreshToken(refreshToken)
  res.json(token)
}

const refresh = async (req, res, next) => {
  try{
    const {refreshToken} = req.body;
    const userData = await refreshTokenInDB(refreshToken)
    return res.json(userData)
  } catch(err) {
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
