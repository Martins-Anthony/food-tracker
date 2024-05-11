const { json } = require("express")

module.exports = (req, res, next) => {
  console.log('***********************************')
  console.log('Middleware checkRoute is running!')
  console.log('Request body:', req.body)
  console.log('***********************************')
  next()
}
