const mongoose = require('mongoose')

const storageSchema = mongoose.Schema({
  storageArea: {
    type: Array,
    required: true,
    unique: true,
    default: [],
  },
  storageItems: {
    type: Object,
    required: true,
    default: {},
  }
})

module.exports = storageSchema
