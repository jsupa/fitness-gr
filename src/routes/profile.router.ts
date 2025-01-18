import { Router } from 'express'

import controller from '../controllers/profile.controller'
import { auth } from '../passport'

export const ProfileRouter = Router()

ProfileRouter.get('/me', auth, controller.me)

/**
 * @openapi
 * /profile/me:
 *  get:
 *   tags: [Profile]
 *   security:
 *    - bearerAuth: []
 *   summary: Me
 *   description: Get user profile
 *   responses:
 *     200:
 *       description: Success
 */
