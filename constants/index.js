const errorMessage = 'error'

const status = {
  success: 200,
  error: 500,
  not_found: 404,
  created: 201,
  bad_request: 400,
  no_credentials: 401,
  unauthorized: 403,
  no_content: 204,
  unprocessable_entity: 422,
}

const infoMessages = {
  USER_NOT_AUTHORIZED: 'User is not authorized!',
  USER_NOT_FOUND: "User hasn't been found!",
  USER_EXIST: 'User is already exist!',
  ONLY_ADMIN_ACCESS: 'Access has only admin!',
  JWT_EXPIRED: 'Jwt is expired!',
  INVALID_PASSWORD: 'Invalid password, please, try again!',
  WRONG_REQUEST: 'Wrong request, try again!',
  NO_MEETUP_IN_DB: 'No meetup in database with id:',
  UPDATED_MEETUP: 'Meetup is updated!',
  DELETED_MEETUP: '- meetup is deleted from database!',
}

const userRoles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

const callbackURL =
  process.env.NODE_ENV === 'production'
    ? process.env.GOOGLE_CALLBACK_URL
    : `http://localhost:5000${process.env.GOOGLE_CALLBACK_URL}`

module.exports = {
  errorMessage,
  infoMessages,
  status,
  userRoles,
  callbackURL,
}
