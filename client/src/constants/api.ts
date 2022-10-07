// export const baseUrl = 'http://localhost:5000'
// export const baseUrl = ''
// export const baseUrl = 'https://meetup-back.herokuapp.com'
// export const baseUrl = ''

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5000';
