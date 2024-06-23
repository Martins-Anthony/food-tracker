const mongoose = require('mongoose')
const itemSchema = require('./ItemSchema')

const storageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [itemSchema],
      required: true,
      default: [],
    },
  },
  { _id: false },
)

module.exports = storageSchema
