import type { Request, Response } from 'express'

import { models } from '../db'
import { Op } from 'sequelize'

const { Program, Exercise } = models

const index = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query

  const exercises = await Exercise.findAll({
    include: [{ model: Program, as: 'program' }],
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
  })

  res.json({
    data: exercises,
    message: 'exercises.index'.t,
  })
}

const create = async (req: Request, res: Response) => {
  const { name, difficulty, programId } = req.body

  if (!name || !difficulty || !programId) throw new Error('error.invalid_data'.t)

  const program = await Program.findByPk(programId)

  if (!program) throw new Error('error.program_not_found'.t)

  const exercise = await Exercise.create({ name, difficulty, programID: programId })

  res.json({
    data: exercise,
    message: 'exercises.created'.t,
  })
}

const show = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) throw new Error('error.invalid_id'.t)

  const exercise = await Exercise.findByPk(id, {
    include: [{ model: Program, as: 'program' }],
  })

  if (!exercise) throw new Error('error.not_found'.t)

  res.json({
    data: exercise,
    message: 'exercises.show'.t,
  })
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, difficulty } = req.body

  if (!id) throw new Error('error.invalid_id'.t)

  const exercise = await Exercise.findByPk(id)

  if (!exercise) throw new Error('error.not_found'.t)

  await exercise.update({ name, difficulty })

  res.json({
    data: exercise,
    message: 'exercises.updated'.t,
  })
}

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) throw new Error('error.invalid_id'.t)

  const exercise = await Exercise.findByPk(id)

  if (!exercise) throw new Error('error.not_found'.t)

  await exercise.destroy()

  res.json({
    message: 'exercises.deleted'.t,
  })
}

const search = async (req: Request, res: Response) => {
  const { name } = req.params

  if (!name) throw new Error('error.invalid_name'.t)

  const exercises = await Exercise.findAll({
    where: { name: { [Op.like]: `%${name}%` } },
  })

  res.json({
    data: exercises,
    message: 'exercises.search'.t,
  })
}

export default { index, create, show, update, destroy, search }
