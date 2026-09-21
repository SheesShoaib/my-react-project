const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = require('./config/db')

const authRoutes =
  require('./routes/authRoutes')

const roomRoutes =
  require('./routes/roomRoutes')

const reservationRoutes =
  require('./routes/reservationRoutes')

const adminRoutes =
  require('./routes/adminRoutes')

const app = express()

app.use(
  cors({
    origin:
      'http://localhost:5173',

    credentials: true,
  })
)

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true,
  })
)

/* =========================
   API ROUTES
========================= */

app.use(
  '/api/auth',
  authRoutes
)

app.use(
  '/api/rooms',
  roomRoutes
)

app.use(
  '/api/reservations',
  reservationRoutes
)

app.use(
  '/api/admin',
  adminRoutes
)

/* =========================
   TEST ROUTE
========================= */

app.get(
  '/api/test',
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        'LuxuryStay API is running successfully.',
    })
  }
)

app.get(
  '/',
  (req, res) => {
    res.send(
      'LuxuryStay Hospitality API'
    )
  }
)

/* =========================
   404 HANDLER
========================= */

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        'API route not found.',
    })
  }
)

/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 5000

const startServer =
  async () => {
    try {
      await connectDB()

      app.listen(
        PORT,
        () => {
          console.log(
            `LuxuryStay server running on port ${PORT}`
          )
        }
      )
    } catch (error) {
      console.error(
        'Server startup error:',
        error
      )

      process.exit(1)
    }
  }

startServer()