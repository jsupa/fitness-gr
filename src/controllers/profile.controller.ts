import type { Request, Response } from 'express'

import { models } from '../db'
import { Op } from 'sequelize'

const { Track, Exercise } = models

const me = async (req: Request, res: Response) => {
  res.json({
    data: req.user,
    message: 'profile.me'.t,
  })
}

const finishedExercises = async (req: Request, res: Response) => {
  const exercises = await Track.findAll({
    where: { userID: req.user?.id, finishedAt: { [Op.not]: null } },
  })

  res.json({
    data: exercises,
    message: 'profile.finished_exercises'.t,
  })
}

const openExercises = async (req: Request, res: Response) => {
  const exercises = await Track.findAll({
    where: { userID: req.user?.id, finishedAt: null },
  })

  res.json({
    data: exercises,
    message: 'profile.open_exercises'.t,
  })
}

const initializeExercise = async (req: Request, res: Response) => {
  const { exerciseid } = req.body

  const exercise = await Exercise.findByPk(exerciseid)

  if (!exercise) throw new Error('exercise.not_found'.t)

  const track = await Track.create({
    userID: req.user?.id,
    exerciseID: exerciseid,
  })

  res.json({
    data: track,
    message: 'profile.initialize_exercise'.t,
  })
}

const finishExercise = async (req: Request, res: Response) => {
  const { trackid } = req.body

  const track = await Track.findByPk(trackid)

  if (!track) throw new Error('track.not_found'.t)

  const trackData = track.toJSON()

  if (trackData.finishedAt) throw new Error('track.already_finished'.t)

  const duration = Math.floor((new Date().getTime() - new Date(trackData.createdAt).getTime()) / 1000)

  await track.update({ finishedAt: new Date(), duration })

  res.json({
    data: track,
    message: 'profile.finish_exercise'.t,
  })
}

const deleteExercise = async (req: Request, res: Response) => {
  const { trackid } = req.body

  const track = await Track.findByPk(trackid)

  if (!track) throw new Error('track.not_found'.t)

  await track.destroy()

  res.json({
    message: 'profile.delete_exercise'.t,
  })
}

export default { me, finishedExercises, initializeExercise, openExercises, finishExercise, deleteExercise }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MzczMjQwMzMsImV4cCI6MTczNzMyNDkzM30.RXRAHfpdXciM0TCsSQq_1p0dmsh_jzavSn_Kwkm5Op8
