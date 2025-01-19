import { Router } from 'express'

import controller from '../controllers/profile.controller'
import { auth } from '../passport'

export const ProfileRouter = Router()

ProfileRouter.get('/me', auth, controller.me)
ProfileRouter.get('/finished-exercises', auth, controller.finishedExercises)
ProfileRouter.get('/open-exercises', auth, controller.openExercises)
ProfileRouter.post('/initialize-exercise', auth, controller.initializeExercise)
ProfileRouter.post('/finish-exercise', auth, controller.finishExercise)
ProfileRouter.delete('/exercise', auth, controller.deleteExercise)

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
 *
 * /profile/finished-exercises:
 *  get:
 *   tags: [Profile]
 *   security:
 *    - bearerAuth: []
 *   summary: Finished exercises
 *   description: Get finished exercises
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
 *
 * /profile/open-exercises:
 *  get:
 *   tags: [Profile]
 *   security:
 *    - bearerAuth: []
 *   summary: Open exercises
 *   description: Get open exercises
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
 *
 * /profile/initialize-exercise:
 *  post:
 *   tags: [Profile]
 *   security:
 *    - bearerAuth: []
 *   summary: Initialize exercise
 *   description: Initialize exercise
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *       type: string
 *       enum: [en, sk]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        exerciseid:
 *         type: integer
 *   responses:
 *     200:
 *       description: Success
 *
 * /profile/finish-exercise:
 *  post:
 *   tags: [Profile]
 *   security:
 *    - bearerAuth: []
 *   summary: Finish exercise
 *   description: Finish exercise
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *       type: string
 *       enum: [en, sk]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        trackid:
 *         type: integer
 *   responses:
 *     200:
 *       description: Success
 *
 * /profile/exercise:
 *  delete:
 *   tags: [Profile]
 *   security:
 *    - bearerAuth: []
 *   summary: Delete exercise
 *   description: Delete exercise
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *       type: string
 *       enum: [en, sk]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        trackid:
 *         type: integer
 *   responses:
 *     200:
 *       description: Success
 */
