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
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *   responses:
 *     200:
 *       description: Success
 */
