import type { NextFunction, Request, Response } from 'express'

import { models } from '../db'

const { Program, Exercise } = models

const index = async (_req: Request, res: Response, _next: NextFunction) => {
  const exercises = await Exercise.findAll({
    include: [
      {
        model: Program,
        as: 'program',
      },
    ],
  })

  return res.json({
    data: exercises,
    message: 'List of exercises',
  })
}

export default { index }
