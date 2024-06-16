const mongoose = require('mongoose')

const storageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
  },
  { _id: false },
)

module.exports = storageSchema
