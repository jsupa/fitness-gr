import type { Request, Response } from 'express'

const me = async (req: Request, res: Response) => {
  res.json({
    data: req.user,
    message: 'profile.me'.t,
  })
}

export default { me }
