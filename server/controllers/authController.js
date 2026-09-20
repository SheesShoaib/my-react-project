const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const generateToken = (userId) => {
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


// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
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
          'Password must contain at least 6 characters.',
      })
    }

    const normalizedEmail =
      email.trim().toLowerCase()

    const existingUser = await User.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          'An account with this email already exists.',
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      )

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password: hashedPassword,
      role: 'guest',
    })

    return res.status(201).json({
      success: true,

      message:
        'Guest account created successfully.',

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
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
        'Server error while creating account.',
    })
  }
}


// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Please enter your email and password.',
      })
    }

    const normalizedEmail =
      email.trim().toLowerCase()

    // Password has select:false in User model,
    // so explicitly request it here.
    const user = await User.findOne({
      email: normalizedEmail,
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

    const token = generateToken(
      user._id
    )

    return res.status(200).json({
      success: true,

      message:
        'Login successful.',

      token,

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
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
        'Server error while logging in.',
    })
  }
}

const getCurrentUser = async (
  req,
  res
) => {
  try {

    const user = req.user

    return res.status(200).json({
      success: true,

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      },
    })

  } catch (error) {

    console.error(
      'Get Current User Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve user information.',
    })
  }
}


module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
}