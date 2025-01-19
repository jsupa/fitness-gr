/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes, Model } from 'sequelize'
import { ExerciseModel } from './exercise'
import { UserModel } from './user'

export class TrackModel extends Model {
  id!: number
  user!: UserModel
  exercise!: ExerciseModel
  finishedAt!: Date
  duration!: number

  createdAt!: Date
  updatedAt!: Date
  deletedAt!: Date

  static associate: (models: any) => void
}

export default (sequelize: Sequelize) => {
  TrackModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      finishedAt: { type: DataTypes.DATE },
      duration: { type: DataTypes.INTEGER },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'track',
    },
  )

  TrackModel.associate = (models: any) => {
    TrackModel.belongsTo(models.User, {
      foreignKey: { name: 'userID', allowNull: false },
    })
    TrackModel.belongsTo(models.Exercise, {
      foreignKey: { name: 'exerciseID', allowNull: false },
    })
  }

  return TrackModel
}
