const Room = require('../models/Room')
const Reservation =
  require('../models/Reservation')


const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      isActive: true,
    }).sort({
      price: 1,
    })

    return res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    })
  } catch (error) {
    console.error(
      'Get Rooms Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve rooms.',
    })
  }
}


const checkAvailability = async (
  req,
  res
) => {
  try {
    const {
      checkIn,
      checkOut,
      guests,
    } = req.query

    if (
      !checkIn ||
      !checkOut ||
      !guests
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Check-in, check-out and guests are required.',
      })
    }

    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const guestCount = Number(guests)

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid reservation dates.',
      })
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message:
          'Check-out must be after check-in.',
      })
    }

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid number of guests.',
      })
    }

    // Overlap:
    // existing.checkIn < requested.checkOut
    // AND existing.checkOut > requested.checkIn

    const conflictingReservations =
      await Reservation.find({
        status: {
          $in: [
            'pending',
            'confirmed',
            'checked-in',
          ],
        },

        checkIn: {
          $lt: end,
        },

        checkOut: {
          $gt: start,
        },
      }).select('room')

    const bookedRoomIds =
      conflictingReservations.map(
        (reservation) =>
          reservation.room
      )

    const rooms = await Room.find({
      _id: {
        $nin: bookedRoomIds,
      },

      isActive: true,

      status: {
        $nin: [
          'maintenance',
        ],
      },

      capacity: {
        $gte: guestCount,
      },
    }).sort({
      price: 1,
    })

    return res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    })

  } catch (error) {
    console.error(
      'Availability Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to check room availability.',
    })
  }
}


module.exports = {
  getRooms,
  checkAvailability,
}