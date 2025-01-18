import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { models } from './../db'
import { encryptPassword, UserModel } from '../db/user'
import { EZError } from '../helper'
import config from '../config'

const { User } = models

const login = async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = req.body

  const user = await User.findByEmail(email, password)

  if (!user) throw new EZError('error.invalid_credentials'.t, 'email')

  const { accessToken, refreshToken } = generateTokens(user)

  await user.update({ refreshToken })

  res.json({ message: 'login_success'.t, accessToken, refreshToken })
}

const register = async (req: Request, res: Response, _next: NextFunction) => {
  const { name, surname, nickname, email, age, role, password } = req.body

  if (!password) throw new EZError('error.password_required'.t, 'password')
  if (password.length < 8) throw new EZError('error.password_too_short'.t, 'password')

  const encryptedPassword = encryptPassword(password)

  const user = await User.create({
    name,
    surname,
    nickname,
    email,
    age,
    role, // ! ROLE FROM CLIENT
    encryptedPassword,
  })

  const { accessToken, refreshToken } = generateTokens(user)

  await user.update({ refreshToken })

  res.json({ message: 'user_created'.t, accessToken, refreshToken })
}

export default { login, register }

const generateTokens = (user: UserModel) => {
  const { id } = user.toJSON()
  const accessToken = jwt.sign({ id }, config.jwtSecret, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id }, config.refreshTokenSecret, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}
