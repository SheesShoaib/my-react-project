const dotenv = require('dotenv')

const connectDB =
  require('./config/db')

const Room =
  require('./models/Room')


dotenv.config()


const rooms = [
  {
    roomNumber: '101',
    name: 'Deluxe Room',
    type: 'Deluxe',

    description:
      'A refined room combining contemporary comfort with elegant interiors and premium amenities.',

    price: 25000,
    capacity: 2,
    beds: '1 King Bed',
    size: '420 sq ft',

    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',

    amenities: [
      'Free Wi-Fi',
      'King Bed',
      'Smart TV',
      'Room Service',
    ],

    status: 'available',
  },

  {
    roomNumber: '201',
    name: 'Executive Suite',
    type: 'Suite',

    description:
      'A spacious suite designed for guests who expect additional privacy, comfort and premium facilities.',

    price: 40000,
    capacity: 3,
    beds: '1 King Bed + Sofa',
    size: '650 sq ft',

    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',

    amenities: [
      'Free Wi-Fi',
      'Living Area',
      'Smart TV',
      'Mini Bar',
    ],

    status: 'available',
  },

  {
    roomNumber: '301',
    name: 'Presidential Suite',
    type: 'Luxury',

    description:
      'Our most exclusive accommodation with expansive living spaces and exceptional luxury.',

    price: 75000,
    capacity: 4,
    beds: '1 King Bed + Sofa',
    size: '1100 sq ft',

    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',

    amenities: [
      'Private Lounge',
      'Premium Wi-Fi',
      'Dining Area',
      'Butler Service',
    ],

    status: 'available',
  },
]


const seedRooms = async () => {
  try {
    await connectDB()

    await Room.deleteMany({})

    await Room.insertMany(rooms)

    console.log(
      'LuxuryStay rooms seeded successfully.'
    )

    process.exit(0)

  } catch (error) {
    console.error(
      'Room Seed Error:',
      error
    )

    process.exit(1)
  }
}


seedRooms()