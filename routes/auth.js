const express = require('express')
const passport = require('passport')
require('@config/passport')
const { userRoles } = require('@constants')

const { status } = require('@constants')
const { googleLogin } = require('@controllers/auth')
const { userValidationMiddleware } = require('@middleware/validationMiddleware')
const { userSchema } = require('@validation/schemas')
const { roleMiddleware } = require('@middleware/roleMiddleware')
const cookie = require('cookie')

const router = express.Router()
const authController = require('@controllers/authController')

const {
  signupStrategy,
  loginStrategy,
  googleStrategy,
} = require('@config/passport')

passport.use('signup', signupStrategy)
passport.use('login', loginStrategy)
passport.use('google', googleStrategy)

router.post(
  '/registration',
  userValidationMiddleware(userSchema),
  passport.authenticate('signup', { session: false }),
  authController.registration
)

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'login',
    (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        res.status(status.error).send({ message: info.message })
      } else {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', user.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            path: 'http://localhost:3000/',
          })
        )

        res.status(status.success).send({
          message: info.message,
          ...user,
        })
      }
    },
    { session: false }
  )(req, res, next)
})

router.post('/logout', authController.logout)

router.get('/refresh', authController.refresh)

router.get('/users', roleMiddleware(userRoles.ADMIN), authController.getUsers)

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: true,
    failureRedirect: 'http://localhost:3000',
  }),
  googleLogin
)

router.get('/getuser', (req, res) => {
  res.send(req.user)
})

module.exports = router
