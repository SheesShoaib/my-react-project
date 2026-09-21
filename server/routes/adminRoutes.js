const express =
  require('express')

const {
  getDashboardStats,

  getStaff,
  createStaff,
  updateStaff,
  toggleStaffStatus,

  getAdminRooms,
  createRoom,
  updateRoom,
  updateRoomStatus,
  updateRoomActiveStatus,
} = require(
  '../controllers/adminController'
)

const {
  protect,
  authorizeRoles,
} = require(
  '../middleware/authMiddleware'
)

const router =
  express.Router()

/*
  Every route below requires:
  1. Valid JWT
  2. Admin role
*/

router.use(protect)

router.use(
  authorizeRoles('admin')
)


/* ========================================
   DASHBOARD
======================================== */

router.get(
  '/dashboard',
  getDashboardStats
)


/* ========================================
   STAFF MANAGEMENT
======================================== */

router
  .route('/staff')
  .get(getStaff)
  .post(createStaff)

router.put(
  '/staff/:id',
  updateStaff
)

router.patch(
  '/staff/:id/status',
  toggleStaffStatus
)


/* ========================================
   ROOM MANAGEMENT
======================================== */

router
  .route('/rooms')
  .get(getAdminRooms)
  .post(createRoom)

router.put(
  '/rooms/:id',
  updateRoom
)

router.patch(
  '/rooms/:id/status',
  updateRoomStatus
)

router.patch(
  '/rooms/:id/active',
  updateRoomActiveStatus
)

module.exports = router