import type { Request, Response } from 'express'

import { models } from '../db'

const { User } = models

const index = async (req: Request, res: Response) => {
  const userIsAdmin = req.user?.role === 'ADMIN'
  const attributes = userIsAdmin ? undefined : ['id', 'nickName']
  const users = await User.findAll({ attributes })

  res.json({
    users,
    message: 'users.index'.t,
  })
}

const show = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) throw new Error('error.invalid_id'.t)

  const userIsAdmin = req.user?.role === 'ADMIN'
  const attributes = userIsAdmin ? undefined : ['id', 'nickName']
  const user = await User.findByPk(id, { attributes })

  res.json({
    user,
    message: 'users.show'.t,
  })
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, surname, nickname, age, role } = req.body

  if (!id) throw new Error('error.invalid_id'.t)
  if (!name || !surname || !nickname || !age || !role) throw new Error('error.invalid_data'.t)

  const user = await User.findByPk(id)

  if (!user) throw new Error('error.invalid_id'.t)

  await user.update({ name, surname, nickName: nickname, age, role })

  res.json({
    user,
    message: 'users.updated'.t,
  })
}

export default { index, show, update }
