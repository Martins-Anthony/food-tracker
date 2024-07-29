const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: 1,
    required: true,
  },
  image_url: {
    type: String,
  },
})

module.exports = itemSchema
