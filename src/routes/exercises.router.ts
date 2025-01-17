import { Router } from 'express'
import controller from '../controllers/excercises.controller'

export const ExerciseRouter = Router()

ExerciseRouter.get('/', controller.index)
