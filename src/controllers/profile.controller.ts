import type { NextFunction, Request, Response } from 'express'

const me = async (req: Request, res: Response, _next: NextFunction) => {
  return res.json({
    data: req.user,
    message: 'profile.me'.t,
  })
}

export default { me }
