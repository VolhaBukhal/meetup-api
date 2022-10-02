const express = require('express')
const passport = require('passport')
require('@config/passport')
const { userRoles } = require('@constants')

const { status } = require('@constants')
const { logout, refresh, getUsers } = require('@controllers/auth')
const { userValidationMiddleware } = require('@middleware/validationMiddleware')
const { userSchema } = require('@validation/schemas')
const { roleMiddleware } = require('@middleware/roleMiddleware')

const router = express.Router()

const { signupStrategy, loginStrategy } = require('@config/passport')

passport.use('signup', signupStrategy)
passport.use('login', loginStrategy)

router.post(
  '/registration',
  userValidationMiddleware(userSchema),
  (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        res.status(status.error).send({ message: info.message })
      } else {
        res.status(status.success).send({
          message: info.message,
          user,
        })
      }
    })(req, res, next)
  }
)

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      res.status(status.error).send({ message: info.message })
    } else {
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.status(status.success).send({
        message: info.message,
        ...user,
      })
    }
  })(req, res, next)
})

router.post('/logout', logout)

router.get('/refresh', refresh)

router.get('/users', roleMiddleware(userRoles.ADMIN), getUsers)

module.exports = router
