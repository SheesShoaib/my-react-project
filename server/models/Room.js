const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        'Deluxe',
        'Suite',
        'Luxury',
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    beds: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      default: '',
    },

    image: {
      type: String,
      default: '',
    },

    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    status: {
      type: String,
      enum: [
        'available',
        'occupied',
        'cleaning',
        'maintenance',
      ],
      default: 'available',
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
  'Room',
  roomSchema
)