import type { Request, Response } from 'express'

import { models } from '../db'

const { Program, Exercise } = models

const index = async (_req: Request, res: Response) => {
  const programs = await Program.findAll({
    include: [{ model: Exercise, as: 'exercises' }],
  })

  res.json({
    data: programs,
    message: 'programs.index'.t,
  })
}

const create = async (req: Request, res: Response) => {
  const { name } = req.body

  if (!name) throw new Error('error.invalid_data'.t)

  const program = await Program.create({ name })

  res.json({
    data: program,
    message: 'programs.created'.t,
  })
}

const show = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) throw new Error('error.invalid_id'.t)

  const program = await Program.findByPk(id, {
    include: [{ model: Exercise, as: 'exercises' }],
  })

  if (!program) throw new Error('error.not_found'.t)

  res.json({
    data: program,
    message: 'programs.show'.t,
  })
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body

  if (!id) throw new Error('error.invalid_id'.t)

  const program = await Program.findByPk(id)

  if (!program) throw new Error('error.not_found'.t)

  await program.update({ name })

  res.json({
    data: program,
    message: 'programs.updated'.t,
  })
}

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) throw new Error('error.invalid_id'.t)

  const program = await Program.findByPk(id)

  if (!program) throw new Error('error.not_found'.t)

  await program.destroy()

  res.json({
    message: 'programs.destroyed'.t,
  })
}

export default { index, show, update, destroy, create }
