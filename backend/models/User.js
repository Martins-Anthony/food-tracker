const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      unique: false,
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
        unique: false,
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
  },
  { strictQuery: false },
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
/*
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      unique: false,
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
        unique: false,
        default: uuidv4(),
      },
      expiration: {
        type: Date,
      },
      active: {
        type: Boolean,
        default: false,
      }
    }
  },
  { strictQuery: false },
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)




const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      unique: false,
      default: 'Anonymous',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    MagicLink: {
      type: String,
      required: false,
      unique: false,
      default: uuidv4(),
    },
    MagicLinkExpired: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { strictQuery: false },
)
*/
