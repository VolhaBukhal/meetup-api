const express = require('express')
const passport = require('passport')
require('@config/passport')
const { userRoles } = require('@constants')

const { userValidationMiddleware } = require('@middleware/validationMiddleware')
const { userSchema } = require('@validation/schemas')
const { roleMiddleware } = require('@middleware/roleMiddleware')

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

router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  authController.login
)

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
  authController.googleLogin
)

router.get('/getuser', (req, res) => {
  res.send(req.user)
})

module.exports = router
