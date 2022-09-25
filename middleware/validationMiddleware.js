import { status } from '../constants/status.js'

export const meetupValidationMiddleware = (schema) => (req, res, next) => {
  const { title, description, time, place } = req.body
  const { error } = schema.validate({ title, description, time, place })
  const valid = error == undefined

  if (valid) {
    next()
  } else {
    res.status(status.unprocessable_entity).json(error.details[0].message)
  }
}

export const userValidationMiddleware = (schema) => (req, res, next) => {
  const { email, password, role } = req.body
  const { error } = schema.validate({ email, password, role })
  const valid = error == undefined

  if (valid) {
    next()
  } else {
    res.status(status.unprocessable_entity).json(error.details[0].message)
  }
}
