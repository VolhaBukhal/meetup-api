const jwt = require('jsonwebtoken')
const { status, infoMessages, userRoles } = require('@constants')

const roleMiddleware = () => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res
        .status(status.unauthorized)
        .json({ message: infoMessages.USER_NOT_AUTHORIZED })
    }

    const { roles: userRole } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    if (userRole !== userRoles.ADMIN) {
      return res
        .status(status.unauthorized)
        .json({ message: infoMessages.ONLY_ADMIN_ACCESS })
    }
    next()
  } catch (err) {
    console.log(err)
    res
      .status(status.no_credentials)
      .json({ message: infoMessages.JWT_EXPIRED })
  }
}

module.exports = { roleMiddleware }
