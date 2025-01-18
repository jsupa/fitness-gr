import { Router } from 'express'
import controller from '../controllers/programs.controller'
import { auth } from '../passport'
import { userIsAdmin } from '../helper'

export const ProgramRouter = Router()

ProgramRouter.get('/', controller.index)
ProgramRouter.post('/', auth, userIsAdmin, controller.create)
ProgramRouter.get('/:id', controller.show)
ProgramRouter.put('/:id', auth, userIsAdmin, controller.update)
ProgramRouter.delete('/:id', auth, userIsAdmin, controller.destroy)

/**
 * @openapi
 * /programs:
 *  get:
 *   tags: [Programs]
 *   security: []
 *   summary: Programs
 *   description: Get all programs
 *   responses:
 *     200:
 *       description: Success
 *  post:
 *   tags: [Programs]
 *   security:
 *    - bearerAuth: []
 *   summary: Create a program only by admin
 *   description: Create a program
 *   requestBody:
 *    description: Program object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         required: true
 *         default: Tuk Burning
 *   responses:
 *     200:
 *      description: Success
 *
 * /programs/{id}:
 *  get:
 *   tags: [Programs]
 *   security: []
 *   summary: Get a program
 *   description: Get a program by ID
 *   parameters:
 *    - name: id
 *      in: path
 *      description: ID of the program
 *      required: true
 *   responses:
 *     200:
 *       description: Success
 *
 *  put:
 *   tags: [Programs]
 *   security:
 *    - bearerAuth: []
 *   summary: Update a program only by admin
 *   description: Update a program by ID
 *   parameters:
 *    - name: id
 *      in: path
 *      description: ID of the program
 *      required: true
 *   requestBody:
 *    description: Program object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         required: true
 *         default: Program
 *   responses:
 *     200:
 *      description: Success
 *
 *  delete:
 *   tags: [Programs]
 *   security:
 *    - bearerAuth: []
 *   summary: Archive a program only by admin
 *   description: Archive a program by ID
 *   parameters:
 *    - name: id
 *      in: path
 *      description: ID of the program
 *      required: true
 *   responses:
 *     200:
 *      description: Success
 */
