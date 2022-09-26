const jwt = require('jsonwebtoken')
const { status, infoMessages } = require('@constants')


const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) {
      return res
        .status(status.unauthorized)
        .json({ message: infoMessages.USER_NOT_AUTHORIZED })
    }

    const decodedUserData = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET
    )

    if (!decodedUserData) {
      throw Error(infoMessages.USER_NOT_AUTHORIZED)
    }
    req.user = decodedUserData
    next()
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: infoMessages.USER_NOT_AUTHORIZED})
  }
}

module.exports = { authMiddleware }
