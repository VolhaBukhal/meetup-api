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
  USER_NOT_FOUND: 'User hasn\'t been found!',
  ONLY_ADMIN_ACCESS: 'Access has only admin!',
  JWT_EXPIRED: 'Jwt is expired!',
  INVALID_PASSWORD: 'Invalid password, please, try again!',
  WRONG_REQUEST: 'Wrong request, try again!',
  NO_MEETUP_IN_DB: 'No meetup in database with id:',
  UPDATED_MEETUP: 'Meetup is updated!',
  DELETED_MEETUP: '- meetup with is deleted from database!',
}

const userRoles = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}

module.exports = {
  errorMessage,
  infoMessages,
  status,
  userRoles
}
