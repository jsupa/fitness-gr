import { Router } from 'express'
import controller from '../controllers/excercises.controller'
import { auth } from '../passport'
import { iDValidator, paginationValidator, userIsAdmin } from '../helper'

export const ExerciseRouter = Router()

ExerciseRouter.get('/', paginationValidator, controller.index)
ExerciseRouter.post('/', auth, userIsAdmin, controller.create)
ExerciseRouter.get('/:id', iDValidator, controller.show)
ExerciseRouter.put('/:id', iDValidator, auth, userIsAdmin, controller.update)
ExerciseRouter.delete('/:id', iDValidator, auth, userIsAdmin, controller.destroy)
ExerciseRouter.get('/search/:name', controller.search)

/**
 * @openapi
 * /exercises:
 *  get:
 *   tags: [Exercise]
 *   security: []
 *   summary: Get all exercises with pagination
 *   description: Get all exercises
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *    - in: query
 *      name: page
 *      schema:
 *        type: integer
 *        default: 1
 *    - in: query
 *      name: limit
 *      schema:
 *        type: integer
 *        default: 10
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
 *
 * /exercises/search/{name}:
 *  get:
 *   tags: [Exercise]
 *   security: []
 *   summary: Search exercises
 *   description: Search exercises by name
 *   parameters:
 *    - name: name
 *      in: path
 *      description: Name of the exercise
 *      required: true
 *   responses:
 *     200:
 *       description: Success
 */
