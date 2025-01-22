import passport from 'passport'

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from './config'
import { models } from './db'
import type { NextFunction, Request, Response } from 'express'

const { User } = models

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async (payload, done) => {
    try {
      console.log('payload', payload)

      const user = await User.findByPk(payload.id, { raw: true })

      if (user) return done(null, user)
      else return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  },
)

passport.use('jwt', jwtStrategy)

export const auth = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err) throw new Error(err)
    if (!user) throw new Error('error.unauthorized'.t)

    req.login(user, { session: false }, (error) => console.log)

    next()
  })(req, res, next)
