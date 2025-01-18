/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes } from 'sequelize'
import { Model } from 'sequelize'
// import { EXERCISE_DIFFICULTY } from '../utils/enums'
import { ExerciseModel } from './exercise'

export class ProgramModel extends Model {
  id: number
  // difficulty: EXERCISE_DIFFICULTY
  name: String

  exercises: ExerciseModel[]
  static associate: (models: any) => void
}

export default (sequelize: Sequelize) => {
  ProgramModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'program',
    },
  )

  ProgramModel.associate = (models: any) => {
    ProgramModel.hasMany(models.Exercise, {
      foreignKey: {
        name: 'programID',
        allowNull: false,
      },
      as: 'exercises',
    })
  }

  return ProgramModel
}
