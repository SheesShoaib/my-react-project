const jwt =
  require('jsonwebtoken')

const User =
  require('../models/User')

const protect = async (
  req,
  res,
  next
) => {
  try {
    const authorization =
      req.headers.authorization

    if (
      !authorization ||
      !authorization.startsWith(
        'Bearer '
      )
    ) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'Authentication required. Please login.',
        })
    }

    const token =
      authorization
        .split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'Authentication token is missing.',
        })
    }

    if (
      !process.env.JWT_SECRET
    ) {
      console.error(
        'JWT_SECRET is missing from environment variables.'
      )

      return res
        .status(500)
        .json({
          success: false,
          message:
            'Server authentication configuration error.',
        })
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      )

    if (!decoded.userId) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'Invalid authentication token.',
        })
    }

    const user =
      await User.findById(
        decoded.userId
      ).select('-password')

    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'User account no longer exists.',
        })
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            'Your account has been deactivated.',
        })
    }

    req.user = user

    next()
  } catch (error) {
    console.error(
      'Authentication Error:',
      error.message
    )

    if (
      error.name ===
      'TokenExpiredError'
    ) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'Your session has expired. Please login again.',
        })
    }

    if (
      error.name ===
      'JsonWebTokenError'
    ) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            'Invalid authentication token.',
        })
    }

    return res
      .status(500)
      .json({
        success: false,
        message:
          'Authentication failed.',
      })
  }
}

const authorizeRoles =
  (...roles) => {
    return (
      req,
      res,
      next
    ) => {
      if (!req.user) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              'Authentication required.',
          })
      }

      if (
        !roles.includes(
          req.user.role
        )
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              'You do not have permission to access this resource.',
          })
      }

      next()
    }
  }

module.exports = {
  protect,
  authorizeRoles,
}