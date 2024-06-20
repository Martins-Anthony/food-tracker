const mongoose = require('mongoose')

const storageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [Object],
      required: true,
    },
  },
  { _id: false },
)

module.exports = storageSchema
