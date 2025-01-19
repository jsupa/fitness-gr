import { Router } from 'express'
import controller from '../controllers/excercises.controller'
import { auth } from '../passport'
import { userIsAdmin } from '../helper'

export const ExerciseRouter = Router()

ExerciseRouter.get('/', controller.index)
ExerciseRouter.post('/', auth, userIsAdmin, controller.create)
ExerciseRouter.get('/:id', controller.show)
ExerciseRouter.put('/:id', auth, userIsAdmin, controller.update)
ExerciseRouter.delete('/:id', auth, userIsAdmin, controller.destroy)

/**
 * @openapi
 * /exercises:
 *  get:
 *   tags: [Exercise]
 *   security: []
 *   summary: Get all exercises
 *   description: Get all exercises
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
 *  post:
 *   tags: [Exercise]
 *   security:
 *    - bearerAuth: []
 *   summary: Create a exercise only by admin
 *   description: Create a exercise
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *   requestBody:
 *    description: exercise object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         required: true
 *         default: Upper body
 *        difficulty:
 *         type: enum
 *         enum: [EASY, MEDIUM, HARD]
 *         required: true
 *         default: EASY
 *        programId:
 *         type: integer
 *         required: true
 *         default: 1
 *   responses:
 *     200:
 *      description: Success
 *
 * /exercises/{id}:
 *  get:
 *   tags: [Exercise]
 *   security: []
 *   summary: Get a exercise
 *   description: Get a exercise by ID
 *   parameters:
 *    - name: id
 *      in: path
 *      description: ID of the exercise
 *      required: true
 *   responses:
 *     200:
 *       description: Success
 *
 *  put:
 *   tags: [Exercise]
 *   security:
 *    - bearerAuth: []
 *   summary: Update a exercise only by admin
 *   description: Update a exercise by ID
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *    - name: id
 *      in: path
 *      description: ID of the exercise
 *      required: true
 *   requestBody:
 *    description: exercise object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         required: true
 *         default: Upper body
 *        difficulty:
 *         type: enum
 *         enum: [EASY, MEDIUM, HARD]
 *         required: true
 *         default: EASY
 *   responses:
 *     200:
 *      description: Success
 *
 *  delete:
 *   tags: [Exercise]
 *   security:
 *    - bearerAuth: []
 *   summary: Archive a exercise only by admin
 *   description: Archive a exercise by ID
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *    - name: id
 *      in: path
 *      description: ID of the exercise
 *      required: true
 *   responses:
 *     200:
 *      description: Success
 */
