const basePathVersion = require('./utils/api/basePath')
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const userRoutes = require('./routes/users')

const app = express()

app.use(cors())
app.use(passport.initialize())

app.use(express.static(path.join(__dirname, 'public')))
/*
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_DATABASE}:${process.env.DATABASE_KEY}@${process.env.CLUSTER_DATABASE}.x9fevre.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.CLUSTER_DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.use(`${basePathVersion}+/users`, userRoutes)

module.exports = app
