import { Router } from 'express'
import controller from '../controllers/login.controller'

export const LoginRouter = Router()

LoginRouter.post('/', controller.login)
LoginRouter.post('/register', controller.register)
