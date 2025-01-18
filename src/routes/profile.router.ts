import { Router } from 'express'

import controller from '../controllers/profile.controller'
import { auth } from '../passport'

export const ProfileRouter = Router()

ProfileRouter.get('/me', auth, controller.me)
