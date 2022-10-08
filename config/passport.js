const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const { ExtractJwt } = require('passport-jwt')

const {
  userExists,
  createUser,
  createUserFromGoogle,
  generateTokens,
  saveToken,
  matchPassword,
  findUserByGoogleId,
} = require('@helpers/auth')
const { callbackURL } = require('@constants')

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

const signupStrategy = new LocalStrategy(
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
      return done(null, user, { message: 'User is registered!' })
    } catch (error) {
      done(error)
    }
  }
)

const loginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await userExists(email)
      if (!user) {
        return done(null, false, {
          message: `User with ${email} hasn't been found`,
        })
      }
      const validPassword = await matchPassword(password, user.password)
      if (!validPassword) {
        return done(null, false, { message: `Invalid password!` })
      }
      const { accessToken, refreshToken } = await generateTokens(
        user.user_id,
        user.role
      )
      const responseUser = {
        accessToken,
        refreshToken,
        user: { id: user.user_id, email: user.email, role: user.role },
      }
      await saveToken(user.user_id, refreshToken)
      return done(null, responseUser, { message: 'Success login!' })
    } catch (error) {
      return done(error, false)
    }
  }
)

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = {}
    try {
      const currentUser = await findUserByGoogleId(profile.id)
      if (!currentUser) {
        await createUserFromGoogle(profile.displayName, profile.id)
        user = await findUserByGoogleId(profile.id)
      } else {
        user = currentUser
      }
      done(null, user)
    } catch (error) {
      done(error)
    }
  }
)

passport.serializeUser((user, done) => {
  // loads into req.session.passport.user
  done(null, user)
})

passport.deserializeUser((user, done) => {
  // loads into req.user
  done(null, user)
})

module.exports = {
  jwtStrategy,
  signupStrategy,
  loginStrategy,
  googleStrategy,
}
