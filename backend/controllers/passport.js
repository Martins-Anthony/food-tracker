const passport = require('passport')
const MagicLoginStrategy = require('passport-magic-login').Strategy
const User = require('../models/User')

passport.use(
  new MagicLoginStrategy(
    {
      secret: process.env.MAGIC_LINK_SECRET,
      magicLinkUrl: 'http://localhost:3000/auth/magic-link',
    },
    async (email, done) => {
      try {
        // Recherchez l'utilisateur dans la base de données
        let user = await User.findOne({ email })

        if (!user) {
          // Créez un nouvel utilisateur si l'utilisateur n'existe pas
          user = await User.create({ email })
        }

        // Retournez l'utilisateur
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    },
  ),
)
