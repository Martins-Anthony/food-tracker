const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const uniqueValidator = require('mongoose-unique-validator')
const storageSchema = require('./Storage')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: 'Anonymous',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    MagicLink: {
      link: {
        type: String,
        required: false,
        default: uuidv4(),
      },
      expiration: {
        type: Date,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
    storage: {
      type: [storageSchema],
      required: true,
      default: [],
    },
  },
  { strictQuery: false },
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
