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
    if (req.authInfo.message !== 'Success login!') {
      return res.status(status.error).send({ message: req.authInfo.message })
    }
    res
      .setHeader(
        'Set-Cookie',
        cookie.serialize('token', req.user.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: 'strict',
          path: 'http://localhost:5000/',
        })
      )
      .status(status.success)
      .send({
        message: req.authInfo.message,
        ...req.user,
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

  async googleLogin(req, res) {
    if (req.user) {
      res.redirect('http://localhost:3000/meetings')
      // res.redirect('http://localhost:5000')
    } else {
      res.status(status.unauthorized).json({ message: res.status })
    }
  }

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
