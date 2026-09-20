const mongoose = require('mongoose')

const reservationSchema =
  new mongoose.Schema(
    {
      guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
      },

      checkIn: {
        type: Date,
        required: true,
      },

      checkOut: {
        type: Date,
        required: true,
      },

      guests: {
        type: Number,
        required: true,
        min: 1,
      },

      nights: {
        type: Number,
        required: true,
        min: 1,
      },

      pricePerNight: {
        type: Number,
        required: true,
        min: 0,
      },

      totalAmount: {
        type: Number,
        required: true,
        min: 0,
      },

      status: {
        type: String,
        enum: [
          'pending',
          'confirmed',
          'checked-in',
          'checked-out',
          'cancelled',
        ],
        default: 'confirmed',
      },

      specialRequests: {
        type: String,
        trim: true,
        maxlength: 500,
        default: '',
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  'Reservation',
  reservationSchema
)