/* eslint import/no-cycle: 0 */

import path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'
import { Sequelize } from 'sequelize'

import defineExercise from './exercise'
import defineProgram from './program'

const sequelize: Sequelize = new Sequelize('fitness_app', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
})

sequelize.authenticate().catch((e: any) => console.error(`Unable to connect to the database${e}.`))

const modelsBuilder = (instance: Sequelize) => ({
  // Import models to sequelize
  Exercise: defineExercise(instance),
  Program: defineProgram(instance),
})

const models = modelsBuilder(sequelize)

// check if every model is imported
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const modelsFiles = fs.readdirSync(__dirname)

console.log({ dbFilesToCheck: modelsFiles })
// -1 because index.ts can not be counted
if (Object.keys(models).length !== modelsFiles.length - 1) {
  throw new Error('You probably forgot import database model!')
}

Object.values(models).forEach((value: any) => {
  if (value.associate) {
    value.associate(models)
  }
})

export { models, modelsBuilder, sequelize }
