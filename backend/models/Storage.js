const mongoose = require('mongoose')

const storageSchema = mongoose.Schema({
  storageArea: {
    type: Array,
    required: true,
    unique: true,
    default: [],
  },
})

module.exports = storageSchema
