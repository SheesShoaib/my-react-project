const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: [
        'guest',
        'admin',
        'manager',
        'receptionist',
        'housekeeping',
      ],
      default: 'guest',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  'User',
  userSchema
)