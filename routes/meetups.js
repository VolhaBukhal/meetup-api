const express = require('express')
const { meetupSchema, updateMeetupSchema } = require('@validation/schemas')
const {
  meetupValidationMiddleware,
} = require('@middleware/validationMiddleware')
const passport = require('passport')
const meetupsController = require('@controllers/meetupsController')

require('@config/passport')
const { jwtStrategy } = require('@config/passport')

passport.use(jwtStrategy)

const router = express.Router()

router.get('/', meetupsController.getMeetups)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  meetupValidationMiddleware(meetupSchema),
  meetupsController.createMeetup
)

router.get('/:id', meetupsController.getMeetupById)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  meetupsController.deleteMeetup
)

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  meetupValidationMiddleware(updateMeetupSchema),
  meetupsController.updateMeetup
)

module.exports = router
