const Joi = require('joi')

const meetupSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.date().required(),
  place: Joi.string().required(),
})

const updateMeetupSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  time: Joi.date(),
  place: Joi.string(),
})

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string(),
})

module.exports = {
  meetupSchema,
  updateMeetupSchema,
  userSchema,
}
