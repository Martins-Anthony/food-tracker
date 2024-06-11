const basePathVersion = require('../utils/api/basePath')
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const { connectDB } = require('../config/database')
const path = require('path')
const cors = require('cors')

const userRoutes = require('../routes/users')
const storageRoutes = require('../routes/storage')

const app = express()

app.use(cors())
app.use(passport.initialize())

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../public', 'index.html'))
})

app.use(`${basePathVersion}+/users`, userRoutes)
app.use(`${basePathVersion}+/users/storage`, storageRoutes)

module.exports = app
