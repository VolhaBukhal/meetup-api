const express = require('express')
const { meetupSchema, updateMeetupSchema } = require('@validation/schemas')
const {
  meetupValidationMiddleware,
} = require('@middleware/validationMiddleware')
const {
  getMeetups,
  createMeetup,
  getMeetupById,
  deleteMeetup,
  updateMeetup,
} = require('@controllers/meetups')
const passport = require('passport')
const { authMiddleware } = require('@middleware/authMiddleware')

require('@config/passport')
const {jwtStrategy} = require('@config/passport')

passport.use(jwtStrategy)

const router = express.Router()

router.get('/', getMeetups)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  meetupValidationMiddleware(meetupSchema),
  createMeetup
)

router.get('/:id', getMeetupById)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteMeetup
)

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  meetupValidationMiddleware(updateMeetupSchema),
  updateMeetup
)

module.exports = router
