import type { NextFunction, Request, Response } from 'express'

import { models } from '../db'

const { Program } = models

const index = async (_req: Request, res: Response, _next: NextFunction) => {
  const programs = await Program.findAll()

  return res.json({
    data: programs,
    message: 'programs.index'.t,
  })
}

export default { index }
