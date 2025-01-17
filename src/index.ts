import express, { type NextFunction, type Request, type Response } from 'express'
import bodyParser from 'body-parser'

import { sequelize } from './db'
import { ProgramRouter } from './routes/programs.router'
import { ExerciseRouter } from './routes/exercises.router'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/programs', ProgramRouter)
app.use('/exercises', ExerciseRouter)

app.use((_req: Request, res: Response) => {
  res.status(404)
  throw new Error('Route not found')
})

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode || 500

  res.status(statusCode).json({ code: statusCode, message: err.message })
})

sequelize.sync()

console.log('Sync database', 'postgresql://localhost:5432/fitness_app')

app.listen(8000, (err: any) => {
  if (err) throw new Error(err)
  console.log('Server started at port 8000')
})
