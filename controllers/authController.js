const { status } = require('@constants')
const authService = require('@services/authService')
const cookie = require('cookie')

class AuthController {
  async registration(req, res) {
    res.status(status.success).json({
      message: req.authInfo.message,
      user: req.user,
    })
  }

  async login(req, res) {
    const { user } = req
    if (!user) {
      res.status(status.error).send({ message: req.authInfo.message })
    } else {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', user.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: 'strict',
          path: 'http://localhost:3000/',
        })
      )

      res.status(status.success).send({
        message: req.authInfo.message,
        ...user,
      })
    }
    res.status(status.success).json({
      message: req.authInfo.message,
      user: req.user,
    })
  }

  async logout(req, res, next) {
    const { token: refreshToken } = cookie.parse(req.headers.cookie || '')
    const googleCookie = cookie.parse(req.headers.cookie || '')

    if (refreshToken) {
      const token = await authService.deleteRefreshToken(refreshToken)
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          expires: new Date(0),
        })
      )
      res.json(token)
    } else if (googleCookie) {
      res.clearCookie('connect.sid', { path: '/' }).status(200).send('Ok')
    } else {
      req.logout((err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/')
      })
    }
  }

  async refresh(req, res, next) {
    try {
      const { token: refreshToken } = cookie.parse(req.headers.cookie || '')
      console.log('refreshToken in authController', refreshToken)
      if (!refreshToken) {
        return res
          .status(status.unauthorized)
          .json({ message: 'Unauthorized!' })
      }
      const userData = await authService.refreshTokenInDB(refreshToken)
      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  // async googleLogin(req, res) {}

  async getUsers(req, res) {
    try {
      const users = await authService.getAllUsers()
      console.log('all users: ', users)
      return res.json(users)
    } catch (error) {
      console.log(error)
      res.status(status.error).send({ message: error })
    }
  }
}

module.exports = new AuthController()

// router.post('/login', (req, res, next) => {
//   passport.authenticate('login', (err, user, info) => {
//     if (err) {
//       return next(err)
//     }
//     if (!user) {
//       res.status(status.error).send({ message: info.message })
//     } else {
//       res.setHeader(
//         'Set-Cookie',
//         cookie.serialize('token', user.refreshToken, {
//           httpOnly: true,
//           maxAge: 30 * 24 * 60 * 60 * 1000,
//           sameSite: 'strict',
//           path: 'http://localhost:3000/',
//         })
//       )

//       res.status(status.success).send({
//         message: info.message,
//         ...user,
//       })
//     }
//   })(req, res, next)
// })
