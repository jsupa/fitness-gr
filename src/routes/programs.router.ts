import { Router } from 'express'
import controller from '../controllers/programs.controller'

export const ProgramRouter = Router()

ProgramRouter.get('/', controller.index)
