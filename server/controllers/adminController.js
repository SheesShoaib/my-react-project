const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Room = require('../models/Room')
const Reservation = require('../models/Reservation')

const getDashboardStats = async (req, res) => {
    try {
        const [
            totalGuests,
            totalStaff,
            totalRooms,
            availableRooms,
            activeReservations,
            revenueResult,
            recentReservations,
        ] = await Promise.all([
            User.countDocuments({
                role: 'guest',
                isActive: true,
            }),

            User.countDocuments({
                role: {
                    $in: [
                        'manager',
                        'receptionist',
                        'housekeeping',
                    ],
                },
                isActive: true,
            }),

            Room.countDocuments({
                isActive: true,
            }),

            Room.countDocuments({
                isActive: true,
                status: 'available',
            }),

            Reservation.countDocuments({
                status: {
                    $in: [
                        'pending',
                        'confirmed',
                        'checked-in',
                    ],
                },
            }),

            Reservation.aggregate([
                {
                    $match: {
                        status: {
                            $in: [
                                'confirmed',
                                'checked-in',
                                'checked-out',
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: '$totalAmount',
                        },
                    },
                },
            ]),

            Reservation.find()
                .populate(
                    'guest',
                    'firstName lastName email'
                )
                .populate(
                    'room',
                    'roomNumber name type'
                )
                .sort({
                    createdAt: -1,
                })
                .limit(5),
        ])

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].total
                : 0

        res.status(200).json({
            success: true,

            stats: {
                totalGuests,
                totalStaff,
                totalRooms,
                availableRooms,
                activeReservations,
                totalRevenue,
            },

            recentReservations,
        })
    } catch (error) {
        console.error(
            'Admin Dashboard Error:',
            error
        )

        res.status(500).json({
            success: false,
            message:
                'Unable to load dashboard statistics.',
        })
    }
}

const STAFF_ROLES = [
    'manager',
    'receptionist',
    'housekeeping',
]

const getStaff = async (req, res) => {
    try {
        const staff = await User.find({
            role: {
                $in: STAFF_ROLES,
            },
        })
            .select('-password')
            .sort({
                createdAt: -1,
            })

        return res.status(200).json({
            success: true,
            count: staff.length,
            staff,
        })
    } catch (error) {
        console.error(
            'Get Staff Error:',
            error
        )

        return res.status(500).json({
            success: false,
            message:
                'Unable to load staff members.',
        })
    }
}

const createStaff = async (
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
            role,
        } = req.body

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !password ||
            !role
        ) {
            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        'Please provide all required fields.',
                })
        }

        if (
            !STAFF_ROLES.includes(
                role
            )
        ) {
            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        'Invalid staff role.',
                })
        }

        if (
            password.length < 6
        ) {
            return res
                .status(400)
                .json({
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
                email:
                    normalizedEmail,
            })

        if (existingUser) {
            return res
                .status(409)
                .json({
                    success: false,
                    message:
                        'A user with this email already exists.',
                })
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                12
            )

        const staffMember =
            await User.create({
                firstName:
                    firstName.trim(),

                lastName:
                    lastName.trim(),

                email:
                    normalizedEmail,

                phone:
                    phone.trim(),

                password:
                    hashedPassword,

                role,

                isActive: true,
            })

        /*
          DEVELOPMENT CHECK:
          Verify MongoDB can immediately
          read the newly-created user.
        */

        const savedStaff =
            await User.findById(
                staffMember._id
            ).select('-password')

        if (!savedStaff) {
            throw new Error(
                'Staff was not found after creation.'
            )
        }

        console.log(
            'Staff saved to MongoDB:',
            {
                id:
                    savedStaff._id.toString(),

                email:
                    savedStaff.email,

                role:
                    savedStaff.role,

                database:
                    mongoose.connection.name,
            }
        )
        return res
            .status(201)
            .json({
                success: true,

                message:
                    'Staff member created successfully.',

                staff:
                    savedStaff,
            })
    } catch (error) {
        console.error(
            'Create Staff Error:',
            error
        )

        return res
            .status(500)
            .json({
                success: false,

                message:
                    error.message ||
                    'Unable to create staff member.',
            })
    }
}

const updateStaff = async (
    req,
    res
) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            role,
        } = req.body

        const staff =
            await User.findById(
                req.params.id
            )

        if (!staff) {
            return res.status(404).json({
                success: false,
                message:
                    'Staff member not found.',
            })
        }

        if (
            !STAFF_ROLES.includes(
                staff.role
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'This account is not a staff account.',
            })
        }

        if (
            role &&
            !STAFF_ROLES.includes(role)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Invalid staff role.',
            })
        }

        if (email) {
            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase()

            const emailOwner =
                await User.findOne({
                    email:
                        normalizedEmail,

                    _id: {
                        $ne: staff._id,
                    },
                })

            if (emailOwner) {
                return res
                    .status(409)
                    .json({
                        success: false,
                        message:
                            'This email is already in use.',
                    })
            }

            staff.email =
                normalizedEmail
        }

        if (firstName) {
            staff.firstName =
                firstName.trim()
        }

        if (lastName) {
            staff.lastName =
                lastName.trim()
        }

        if (phone) {
            staff.phone =
                phone.trim()
        }

        if (role) {
            staff.role = role
        }

        await staff.save()

        return res.status(200).json({
            success: true,
            message:
                'Staff member updated successfully.',

            staff: {
                id: staff._id,
                firstName:
                    staff.firstName,
                lastName:
                    staff.lastName,
                email:
                    staff.email,
                phone:
                    staff.phone,
                role:
                    staff.role,
                isActive:
                    staff.isActive,
            },
        })
    } catch (error) {
        console.error(
            'Update Staff Error:',
            error
        )

        return res.status(500).json({
            success: false,
            message:
                'Unable to update staff member.',
        })
    }
}

const toggleStaffStatus = async (
    req,
    res
) => {
    try {
        const staff =
            await User.findById(
                req.params.id
            )

        if (!staff) {
            return res.status(404).json({
                success: false,
                message:
                    'Staff member not found.',
            })
        }

        if (
            !STAFF_ROLES.includes(
                staff.role
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'This account is not a staff account.',
            })
        }

        staff.isActive =
            !staff.isActive

        await staff.save()

        return res.status(200).json({
            success: true,

            message: staff.isActive
                ? 'Staff account activated successfully.'
                : 'Staff account deactivated successfully.',

            staff: {
                id: staff._id,
                firstName:
                    staff.firstName,
                lastName:
                    staff.lastName,
                email:
                    staff.email,
                role:
                    staff.role,
                isActive:
                    staff.isActive,
            },
        })
    } catch (error) {
        console.error(
            'Staff Status Error:',
            error
        )

        return res.status(500).json({
            success: false,
            message:
                'Unable to update staff status.',
        })
    }
}

/* ========================================
   ROOM MANAGEMENT
======================================== */

const ROOM_TYPES = [
    'Deluxe',
    'Suite',
    'Luxury',
]

const ROOM_STATUSES = [
    'available',
    'occupied',
    'cleaning',
    'maintenance',
]

const getAdminRooms = async (
    req,
    res
) => {
    try {
        const rooms =
            await Room.find()
                .sort({
                    roomNumber: 1,
                })

        return res.status(200).json({
            success: true,
            count: rooms.length,
            rooms,
        })
    } catch (error) {
        console.error(
            'Get Admin Rooms Error:',
            error
        )

        return res.status(500).json({
            success: false,
            message:
                'Unable to load room inventory.',
        })
    }
}


const createRoom = async (
    req,
    res
) => {
    try {
        const {
            roomNumber,
            name,
            type,
            description,
            price,
            capacity,
            beds,
            size,
            image,
            amenities,
            status,
        } = req.body

        if (
            !roomNumber ||
            !name ||
            !type ||
            !description ||
            price === undefined ||
            capacity === undefined ||
            !beds
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Please provide all required room fields.',
            })
        }

        if (
            !ROOM_TYPES.includes(type)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Invalid room type.',
            })
        }

        if (
            status &&
            !ROOM_STATUSES.includes(
                status
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Invalid room status.',
            })
        }

        const numericPrice =
            Number(price)

        const numericCapacity =
            Number(capacity)

        if (
            Number.isNaN(numericPrice) ||
            numericPrice <= 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Room price must be greater than zero.',
            })
        }

        if (
            Number.isNaN(
                numericCapacity
            ) ||
            numericCapacity < 1
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Room capacity must be at least 1.',
            })
        }

        const normalizedRoomNumber =
            String(roomNumber).trim()

        const existingRoom =
            await Room.findOne({
                roomNumber:
                    normalizedRoomNumber,
            })

        if (existingRoom) {
            return res.status(409).json({
                success: false,
                message:
                    'A room with this room number already exists.',
            })
        }

        const room =
            await Room.create({
                roomNumber:
                    normalizedRoomNumber,

                name:
                    name.trim(),

                type,

                description:
                    description.trim(),

                price:
                    numericPrice,

                capacity:
                    numericCapacity,

                beds:
                    beds.trim(),

                size:
                    size?.trim() || '',

                image:
                    image?.trim() || '',

                amenities:
                    Array.isArray(amenities)
                        ? amenities
                            .map(
                                (item) =>
                                    String(
                                        item
                                    ).trim()
                            )
                            .filter(Boolean)
                        : [],

                status:
                    status ||
                    'available',

                isActive: true,
            })

        return res.status(201).json({
            success: true,
            message:
                'Room created successfully.',
            room,
        })
    } catch (error) {
        console.error(
            'Create Room Error:',
            error
        )

        return res.status(500).json({
            success: false,
            message:
                'Unable to create room.',
        })
    }
}


const updateRoom = async (
    req,
    res
) => {
    try {
        const room =
            await Room.findById(
                req.params.id
            )

        if (!room) {
            return res.status(404).json({
                success: false,
                message:
                    'Room not found.',
            })
        }

        const {
            roomNumber,
            name,
            type,
            description,
            price,
            capacity,
            beds,
            size,
            image,
            amenities,
        } = req.body

        if (
            roomNumber !== undefined
        ) {
            const normalizedRoomNumber =
                String(
                    roomNumber
                ).trim()

            if (
                !normalizedRoomNumber
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'Room number is required.',
                    })
            }

            const existingRoom =
                await Room.findOne({
                    roomNumber:
                        normalizedRoomNumber,

                    _id: {
                        $ne: room._id,
                    },
                })

            if (existingRoom) {
                return res
                    .status(409)
                    .json({
                        success: false,
                        message:
                            'Another room already uses this room number.',
                    })
            }

            room.roomNumber =
                normalizedRoomNumber
        }

        if (
            type !== undefined
        ) {
            if (
                !ROOM_TYPES.includes(
                    type
                )
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'Invalid room type.',
                    })
            }

            room.type = type
        }

        if (
            price !== undefined
        ) {
            const numericPrice =
                Number(price)

            if (
                Number.isNaN(
                    numericPrice
                ) ||
                numericPrice <= 0
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'Room price must be greater than zero.',
                    })
            }

            room.price =
                numericPrice
        }

        if (
            capacity !== undefined
        ) {
            const numericCapacity =
                Number(capacity)

            if (
                Number.isNaN(
                    numericCapacity
                ) ||
                numericCapacity < 1
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'Room capacity must be at least 1.',
                    })
            }

            room.capacity =
                numericCapacity
        }

        if (name !== undefined) {
            room.name =
                name.trim()
        }

        if (
            description !== undefined
        ) {
            room.description =
                description.trim()
        }

        if (beds !== undefined) {
            room.beds =
                beds.trim()
        }

        if (size !== undefined) {
            room.size =
                size.trim()
        }

        if (image !== undefined) {
            room.image =
                image.trim()
        }

        if (
            amenities !== undefined
        ) {
            if (
                !Array.isArray(
                    amenities
                )
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'Amenities must be an array.',
                    })
            }

            room.amenities =
                amenities
                    .map(
                        (item) =>
                            String(
                                item
                            ).trim()
                    )
                    .filter(Boolean)
        }

        await room.save()

        return res.status(200).json({
            success: true,
            message:
                'Room updated successfully.',
            room,
        })
    } catch (error) {
        console.error(
            'Update Room Error:',
            error
        )

        return res.status(500).json({
            success: false,
            message:
                'Unable to update room.',
        })
    }
}


const updateRoomStatus =
    async (req, res) => {
        try {
            const {
                status,
            } = req.body

            if (
                !ROOM_STATUSES.includes(
                    status
                )
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'Invalid room status.',
                    })
            }

            const room =
                await Room.findById(
                    req.params.id
                )

            if (!room) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            'Room not found.',
                    })
            }

            room.status = status

            await room.save()

            return res
                .status(200)
                .json({
                    success: true,
                    message:
                        `Room status changed to ${status}.`,
                    room,
                })
        } catch (error) {
            console.error(
                'Room Status Error:',
                error
            )

            return res
                .status(500)
                .json({
                    success: false,
                    message:
                        'Unable to update room status.',
                })
        }
    }


const updateRoomActiveStatus =
    async (req, res) => {
        try {
            const {
                isActive,
            } = req.body

            if (
                typeof isActive !==
                'boolean'
            ) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'isActive must be true or false.',
                    })
            }

            const room =
                await Room.findById(
                    req.params.id
                )

            if (!room) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            'Room not found.',
                    })
            }

            room.isActive =
                isActive

            await room.save()

            return res
                .status(200)
                .json({
                    success: true,

                    message:
                        isActive
                            ? 'Room activated successfully.'
                            : 'Room deactivated successfully.',

                    room,
                })
        } catch (error) {
            console.error(
                'Room Active Status Error:',
                error
            )

            return res
                .status(500)
                .json({
                    success: false,
                    message:
                        'Unable to update room availability.',
                })
        }
    }

module.exports = {
    // Dashboard
    getDashboardStats,

    // Staff Management
    getStaff,
    createStaff,
    updateStaff,
    toggleStaffStatus,

    // Room Management
    getAdminRooms,
    createRoom,
    updateRoom,
    updateRoomStatus,
    updateRoomActiveStatus,
}