import { Router } from 'express'
import controller from '../controllers/login.controller'

export const LoginRouter = Router()

LoginRouter.post('/', controller.login)
LoginRouter.post('/register', controller.register)

/**
 * @openapi
 * /login:
 *  post:
 *   tags: [Login]
 *   security: []
 *   summary: Login
 *   description: User login
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *   requestBody:
 *    description: User object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         required: true
 *         default: some@some.sk
 *        password:
 *         type: string
 *         required: true
 *         default: password
 *   responses:
 *     200:
 *       description: Success
 *
 * /login/register:
 *  post:
 *   tags: [Login]
 *   security: []
 *   summary: Register
 *   description: Register new user
 *   parameters:
 *    - in: header
 *      name: Accept-Language
 *      required: true
 *      schema:
 *        type: string
 *        enum: [en, sk]
 *   requestBody:
 *    description: User object
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
 *         required: false
 *         default: JohnDoe
 *        age:
 *         type: number
 *         required: false
 *         default: 18
 *        role:
 *         type: enum
 *         enum: [USER, ADMIN]
 *         required: false
 *        email:
 *         type: string
 *         required: true
 *         default: some@some.sk
 *        password:
 *          type: string
 *          required: true
 *          default: password
 *   responses:
 *     200:
 *       description: Success
 *
 */
