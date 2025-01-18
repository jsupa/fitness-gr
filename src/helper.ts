import type { NextFunction, Request, Response } from 'express'

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
