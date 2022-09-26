const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const { ExtractJwt } = require('passport-jwt')

const { userExists, createUser, generateTokens, saveToken, matchPassword } = require('@helpers/auth')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_ACCESS_SECRET

const jwtStrategy = new JwtStrategy(opts, (token, done) => {
  try {
    return done(null, token)
  } catch (error) {
    done(error)
  }
})

const signupStrategy =  new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const userIsExists = await userExists(email)
      if (userIsExists) {
        return done(null, false, { message: 'User is already exist!!!!!' })
      }
      const user = await createUser(email, password, req.body.role)
      return done(null, user, {message: 'User is registered!'})
    } catch (error) {
      done(error)
    }
  }
)

const loginStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await userExists(email);
      if (!user) {
        return done(null, false, {message: `User with ${email} hasn't been found`})
      }  
      const validPassword = await matchPassword(password, user.password)
      if (!validPassword) {
        return done(null, false, {message: `User with ${email} hasn't been found`});
      }
      const { accessToken, refreshToken } = await generateTokens( user.user_id, user.role) 
      const responseUser = {accessToken, refreshToken, user: {id: user.user_id, email: user.email, role: user.role}}
      await saveToken(user.user_id, refreshToken)
      return done(null, responseUser, {message: 'Success login!'} );
    } catch (error) {
      return done(error, false);
    }
  }
)

module.exports = {
  jwtStrategy,
  signupStrategy,
  loginStrategy
}
