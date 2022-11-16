const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const { ExtractJwt } = require('passport-jwt')
const authService = require('@services/authService')

const { generateTokens } = require('@helpers/auth')
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
      const userFromDB = await authService.findUser(email)
      if (userFromDB) {
        return done(null, userFromDB, { message: 'User is already exist!' })
      }

      const user = await authService.createUser(email, password, req.body.role)
      return done(null, user, { message: 'User is registered!' })
    } catch (err) {
      console.log('error in authUser: ', err)
      done(err)
    }
  }
)

const loginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    let user = {}
    try {
      user = await authService.findUser(email)
      if (!user) {
        return done(null, false)
      }
      const validPassword = await authService.matchPassword(
        password,
        user.password
      )
      if (!validPassword) {
        return done(null, user, { message: `Invalid password!` })
      }
      const { accessToken, refreshToken } = await generateTokens(
        user.id,
        user.role
      )
      user = {
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email, role: user.role },
      }
      await authService.saveToken(user.user.id, refreshToken)
      done(null, user, { message: 'Success login!' })
    } catch (error) {
      done(error)
    }
  }
)

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL,
  },
  async (googleAccessToken, googleRefreshToken, profile, email, done) => {
    let user = {}

    try {
      const currentUser = await authService.findUser(email._json.email)
      if (currentUser) {
        const { accessToken, refreshToken } = await generateTokens(
          currentUser.id,
          currentUser.role
        )

        await authService.saveToken(currentUser.id, refreshToken)
        user = {
          accessToken,
          refreshToken,
          user: {
            id: currentUser.id,
            email: currentUser.email,
            role: currentUser.role,
          },
        }
      } else {
        user = await authService.createUserFromGoogle(email._json.email)
      }
      done(null, user)
    } catch (error) {
      console.log('error in googleStrategy cathc: ', error)
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
