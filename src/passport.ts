import passport from 'passport'

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from './config'
import { models } from './db'

const { User } = models

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async (payload, done) => {
    try {
      console.log('payload', payload)

      const user = await User.findByPk(payload.id)

      if (user) return done(null, user)
      else return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  },
)

passport.use('jwt', jwtStrategy)

export const auth = passport.authenticate('jwt', { session: false })
