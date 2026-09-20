const express = require('express')

const {
  createReservation,
  getMyReservations,
} = require(
  '../controllers/reservationController'
)

const {
  protect,
  authorizeRoles,
} = require(
  '../middleware/authMiddleware'
)

const router = express.Router()

router.use(protect)

router.post(
  '/',
  authorizeRoles('guest'),
  createReservation
)

router.get(
  '/my',
  authorizeRoles('guest'),
  getMyReservations
)

module.exports = router