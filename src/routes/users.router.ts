import { Router } from 'express'

import controller from '../controllers/users.controller'
import { auth } from '../passport'
import { userIsAdmin } from '../helper'

export const UsersRouter = Router()

UsersRouter.get('/', auth, controller.index)
UsersRouter.get('/:id', auth, controller.show)
UsersRouter.put('/:id', auth, userIsAdmin, controller.update)

/**
 * @openapi
 * /users/:
 *  get:
 *   tags: [Users]
 *   security:
 *    - bearerAuth: []
 *   summary: Users
 *   description: Get users
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
 * /users/{id}:
 *  get:
 *   tags: [Users]
 *   security:
 *    - bearerAuth: []
 *   summary: User
 *   description: Get user
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
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
 *  put:
 *   tags: [Users]
 *   security:
 *    - bearerAuth: []
 *   summary: Update user only by admin
 *   description: Update user
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *   requestBody:
 *    description: user object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         required: true
 *         default: John
 *        surname:
 *         type: string
 *         required: true
 *         default: Doe
 *        nickname:
 *         type: string
 *         required: true
 *         default: johndoe
 *        age:
 *         type: integer
 *         required: true
 *         default: 25
 *        role:
 *         type: enum
 *         enum: [USER,ADMIN]
 *         required: true
 *
 *   responses:
 *     200:
 *       description: Success
 *
 */
