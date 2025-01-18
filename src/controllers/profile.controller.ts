import type { Request, Response } from 'express'

const me = async (req: Request, res: Response) => {
  return res.json({
    data: req.user,
    message: 'profile.me'.t,
  })
}

export default { me }
