import jwt from 'jsonwebtoken'
import { status } from '../constants/status.js'

export const roleMiddleware = (roles) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res
        .status(status.unauthorized)
        .json({ message: 'User is not authorized' })
    }

    const { roles: userRole } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    if (userRole !== 'ADMIN') {
      return res
        .status(status.unauthorized)
        .json({ message: 'Access has only admin!' })
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
  }
}
