const Room = require('../models/Room')

const Reservation =
  require('../models/Reservation')


const createReservation = async (
  req,
  res
) => {
  try {
    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      specialRequests,
    } = req.body

    if (
      !roomId ||
      !checkIn ||
      !checkOut ||
      !guests
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all reservation details.',
      })
    }

    const room =
      await Room.findById(roomId)

    if (
      !room ||
      !room.isActive
    ) {
      return res.status(404).json({
        success: false,
        message:
          'Room not found.',
      })
    }

    if (
      room.status === 'maintenance'
    ) {
      return res.status(409).json({
        success: false,
        message:
          'This room is currently unavailable.',
      })
    }

    const guestCount =
      Number(guests)

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

    if (
      guestCount > room.capacity
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Guest count exceeds room capacity.',
      })
    }

    const start =
      new Date(checkIn)

    const end =
      new Date(checkOut)

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

    const today = new Date()

    today.setHours(
      0,
      0,
      0,
      0
    )

    if (start < today) {
      return res.status(400).json({
        success: false,
        message:
          'Check-in cannot be in the past.',
      })
    }


    // Check whether this room already
    // has an overlapping reservation.

    const conflict =
      await Reservation.findOne({
        room: room._id,

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
      })

    if (conflict) {
      return res.status(409).json({
        success: false,
        message:
          'This room is no longer available for the selected dates.',
      })
    }


    const milliseconds =
      end.getTime() -
      start.getTime()

    const nights = Math.ceil(
      milliseconds /
        (1000 * 60 * 60 * 24)
    )

    const pricePerNight =
      room.price

    const totalAmount =
      pricePerNight * nights


    const reservation =
      await Reservation.create({
        guest: req.user._id,
        room: room._id,
        checkIn: start,
        checkOut: end,
        guests: guestCount,
        nights,
        pricePerNight,
        totalAmount,
        specialRequests:
          specialRequests?.trim() || '',
        status: 'confirmed',
      })


    const populatedReservation =
      await Reservation.findById(
        reservation._id
      ).populate(
        'room',
        'roomNumber name type price image'
      )


    return res.status(201).json({
      success: true,
      message:
        'Reservation created successfully.',
      reservation:
        populatedReservation,
    })

  } catch (error) {
    console.error(
      'Create Reservation Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to create reservation.',
    })
  }
}


const getMyReservations = async (
  req,
  res
) => {
  try {
    const reservations =
      await Reservation.find({
        guest: req.user._id,
      })
        .populate(
          'room',
          'roomNumber name type price image'
        )
        .sort({
          createdAt: -1,
        })

    return res.status(200).json({
      success: true,
      count: reservations.length,
      reservations,
    })

  } catch (error) {
    console.error(
      'Get Reservations Error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve reservations.',
    })
  }
}


module.exports = {
  createReservation,
  getMyReservations,
}