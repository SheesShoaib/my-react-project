const roomRoutes = require('./routes/roomRoutes')
const reservationRoutes = require('./routes/reservationRoutes')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

const app = express()

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
)

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true,
    })
)

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
app.get('/api/test', (req, res) => {
    res.status(200).json({
        success: true,
        message:
            'LuxuryStay API is running successfully.',
    })
})

app.get('/', (req, res) => {
    res.send(
        'LuxuryStay Hospitality API'
    )
})

const PORT =
    process.env.PORT || 5000

const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(
            `LuxuryStay server running on port ${PORT}`
        )
    })
}

startServer()