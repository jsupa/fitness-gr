import type { NextFunction, Request, Response } from 'express'
import { param, query, validationResult } from 'express-validator'

export class EZError extends Error {
  constructor(
    public message: string,
    public field?: string,
  ) {
    super(message)

    this.field = field || undefined
  }
}

export const userIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new Error('error.unauthorized'.t)
  if (req.user.role !== 'ADMIN') throw new Error('error.nonrights'.t)

  next()
}

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) return next()

  const errorsArray = errors.array().map((error: any) => ({
    field: error.path,
    message: String(error.msg).t,
    value: error.value,
    location: error.location,
  }))

  res.status(400).json({ errors: errorsArray })
}

export const paginationValidator = [
  query('page').optional().isInt().withMessage('error.must_be_int'),
  query('limit').optional().isInt().withMessage('error.must_be_int'),

  checkValidation,
]

export const iDValidator = [param('id').isInt().withMessage('error.must_be_int'), checkValidation]
