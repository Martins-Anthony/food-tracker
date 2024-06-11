const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ADDRESS_DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

const closeDB = async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB Disconnected')
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err.message)
  }
}

module.exports = { connectDB, closeDB }
