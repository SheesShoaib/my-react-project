const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connection =
      await mongoose.connect(
        process.env.MONGO_URI
      )

    console.log(
      '\n=============================='
    )
    console.log('MongoDB Connected')
    console.log(
      'Host:',
      connection.connection.host
    )
    console.log(
      'Port:',
      connection.connection.port
    )
    console.log(
      'Database:',
      connection.connection.name
    )
    console.log(
      'Users Collection:',
      mongoose.connection
        .collection('users')
        .collectionName
    )
    console.log(
      '==============================\n'
    )
  } catch (error) {
    console.error(
      'MongoDB Connection Error:',
      error.message
    )

    process.exit(1)
  }
}

module.exports = connectDB