import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { models } from './../db'
import { encryptPassword, UserModel } from '../db/user'
import { EZError } from '../helper'
import config from '../config'

const { User } = models

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findByEmail(email, password)

  if (!user) throw new EZError('error.invalid_credentials'.t, 'email')

  const { accessToken, refreshToken } = generateTokens(user)

  await user.update({ refreshToken })

  res.json({ message: 'login_success'.t, accessToken, refreshToken })
}

const register = async (req: Request, res: Response) => {
  const { name, surname, nickname, email, age, role, password } = req.body

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

const refresh = async (req: Request, res: Response) => {
  const { refreshtoken } = req.body

  const payload = jwt.verify(refreshtoken, config.refreshTokenSecret) as { id: number }

  const user = await User.findOne({ where: { id: payload.id, refreshToken: refreshtoken } })

  if (!user) throw new EZError('error.invalid_refresh_token'.t, 'refreshtoken')

  const { accessToken, refreshToken } = generateTokens(user)

  await user.update({ refreshToken })

  res.json({ message: 'refreshed'.t, accessToken, refreshToken })
}

export default { login, register, refresh }

const generateTokens = (user: UserModel) => {
  const { id } = user.toJSON()
  const accessToken = jwt.sign({ id }, config.jwtSecret, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id }, config.refreshTokenSecret, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}
