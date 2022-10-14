const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const { ExtractJwt } = require('passport-jwt')
const authService = require('@services/authService')
const { User } = require('@models/models')

const {
  userExists,
  // createUser,
  createUserFromGoogle,
  generateTokens,
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
      const userFromDB = await authService.findUser(email)
      if (userFromDB) {
        return done(null, userFromDB, { message: 'User is already exist!' })
      }

      const user = await authService.createUser(email, password, req.body.role)
      console.log('created user: ', user)
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
    try {
      const user = await authService.findUser(email)
      console.log('user from loginStrategy: ', user)
      if (!user) {
        req.authError = `User with ${email} hasn't been found`
        return done(null, false, {
          message: `User with ${email} hasn't been found`,
        })
      }
      const validPassword = await authService.matchPassword(
        password,
        user.password
      )
      console.log('ValidPassword: ', validPassword)
      if (!validPassword) {
        return done(req.hxr, false, { message: `Invalid password!` })
      }
      const { accessToken, refreshToken } = await generateTokens(
        user.id,
        user.role
      )
      const responseUser = {
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email, role: user.role },
      }
      await authService.saveToken(user.id, refreshToken)
      done(null, responseUser, { message: 'Success login!' })
    } catch (error) {
      done(error)
    }
  }
)

// const googleStrategy = new GoogleStrategy(
//   {
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL,
//   },
//   async (accessToken, refreshToken, profile, email, done) => {
//     console.log('email from google: ', email)
//     console.log('profile from google: ', profile)
//     let user = {}
//     try {
//       const currentUser = await findUserByGoogleId(profile.id)
//       if (!currentUser) {
//         await createUserFromGoogle(profile.displayName, profile.id)
//         user = await findUserByGoogleId(profile.id)
//       } else {
//         user = { ...currentUser, accessToken }
//       }
//       done(null, user)
//     } catch (error) {
//       done(error)
//     }
//   }
// )
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL,
  },
  async (accessToken, refreshToken, profile, email, done) => {
    let user = {}
    try {
      const currentUser = await userExists(email._json.email)
      if (!currentUser) {
        await createUserFromGoogle(
          email._json.email,
          email._json.sub,
          refreshToken
        )
        const userFromDB = await userExists(email._json.email)
        user = {
          ...userFromDB,
          accessToken,
          refresh_token: null,
        }
      } else {
        user = {
          ...currentUser,
          accessToken,
          refresh_token: null,
        }
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
