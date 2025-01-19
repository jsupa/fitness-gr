import express, { type NextFunction, type Request, type Response } from 'express'
// import bodyParser from 'body-parser'
import passport from 'passport'
import { I18n } from 'i18n'
import YAML from 'yaml'
import swaggerUi from 'swagger-ui-express'

import './passport'
import locals from './locals'
import { sequelize } from './db'
import swagger from './swagger'

import { ProgramRouter } from './routes/programs.router'
import { ExerciseRouter } from './routes/exercises.router'
import { LoginRouter } from './routes/login.router'
import { ProfileRouter } from './routes/profile.router'
import { UsersRouter } from './routes/users.router'

const app = express()

const i18n = new I18n({
  locales: ['sk', 'en'],
  extension: '.yml',
  directory: './locales',
  parser: YAML,
  objectNotation: true,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(i18n.init)
app.use(locals)

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
app.use('/login', LoginRouter)
app.use('/profile', ProfileRouter)
app.use('/users', UsersRouter)
app.use('/programs', ProgramRouter)
app.use('/exercises', ExerciseRouter)

app.use((_req: Request, res: Response) => {
  res.status(404)
  throw new Error('error.404'.t)
})

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const field = err.field || 'error'

  res.status(500).json({ field, message: err.message })
})

sequelize.sync()

console.log('Sync database', 'postgresql://localhost:5432/fitness_app')

app.listen(8000, (err: any) => {
  if (err) throw new Error(err)
  console.log('Server started at port 8000 (http://localhost:8000/api-docs)')
})
