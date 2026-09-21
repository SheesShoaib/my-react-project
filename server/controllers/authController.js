const bcrypt =
  require('bcryptjs')

const jwt =
  require('jsonwebtoken')

const User =
  require('../models/User')

const createToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

const register = async (
  req,
  res
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = req.body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required fields.',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 6 characters.',
      })
    }

    const normalizedEmail =
      email
        .trim()
        .toLowerCase()

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          'An account with this email already exists.',
      })
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      )

    const user =
      await User.create({
        firstName:
          firstName.trim(),
        lastName:
          lastName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        password:
          hashedPassword,
        role: 'guest',
      })

    return res.status(201).json({
      success: true,
      message:
        'Account created successfully.',
      user: {
        id: user._id,
        firstName:
          user.firstName,
        lastName:
          user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(
      'Register Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to create account.',
    })
  }
}

const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Email and password are required.',
      })
    }

    const user =
      await User.findOne({
        email:
          email
            .trim()
            .toLowerCase(),
      }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          'Invalid email or password.',
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          'Your account has been deactivated.',
      })
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          'Invalid email or password.',
      })
    }

    const token =
      createToken(user._id)

    return res.status(200).json({
      success: true,
      message:
        'Login successful.',
      token,
      user: {
        id: user._id,
        firstName:
          user.firstName,
        lastName:
          user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(
      'Login Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to login.',
    })
  }
}

const getMe = async (
  req,
  res
) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Unable to load profile.',
    })
  }
}

module.exports = {
  register,
  login,
  getMe,
}