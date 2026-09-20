const express = require('express')

const {
  getRooms,
  checkAvailability,
} = require('../controllers/roomController')

const router = express.Router()

router.get(
  '/',
  getRooms
)

router.get(
  '/availability',
  checkAvailability
)

module.exports = router