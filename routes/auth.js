const express = require('express')
const passport = require('passport')
require('@config/passport')

const {status} = require('@constants/status')
const { registration, login, logout, refresh, getUsers } = require('@controllers/auth')
const { userValidationMiddleware } = require('@middleware/validationMiddleware')
const { userSchema } = require('@validation/schemas')
const { roleMiddleware } = require('@middleware/roleMiddleware')

const router = express.Router()

const {signupStrategy, loginStrategy} = require('@config/passport')

passport.use( 'signup', signupStrategy)
passport.use( 'login', loginStrategy)

// TODO: move logic with responses to controllers
router.post('/registration', function (req, res, next) {
  passport.authenticate('signup', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(status.error).send({message: info.message});
    } else {
      res.status(status.success).send({ 
        message: info.message,
        user
     });
    }
  })(req, res, next);
});

router.post('/login', function (req, res, next) {
  passport.authenticate('login', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(status.error).send({message: info.message});
    } else {
      res.status(status.success).send({ 
        message: info.message,
        ...user
     });
    }
  })(req, res, next)
})

router.post('/logout', logout)

router.post('/refresh', refresh)

router.get('/users', roleMiddleware('ADMIN'), getUsers)

module.exports = router
