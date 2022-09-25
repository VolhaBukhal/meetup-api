import jwt from 'jsonwebtoken'
import { status } from '../constants/status.js'

export const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) {
      return res
        .status(status.unauthorized)
        .json({ message: 'User is not authorized' })
    }

    const decodedUserData = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET
    )

    if (!decodedUserData) {
      throw Error('User is not authorized!')
    }

    req.user = decodedUserData
    next()
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: 'User is not authorized' })
  }
}
