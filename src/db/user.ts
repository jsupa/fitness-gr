/* eslint import/no-cycle: 0 */

import { Sequelize, DataTypes, Model } from 'sequelize'
import { ProgramModel } from './program'
import { faker } from '@faker-js/faker'
import crypto from 'crypto'

import config from '../config'

export class UserModel extends Model {
  id!: number
  name!: String
  surname!: String
  nickName!: String
  email!: String
  age!: number
  role!: String
  encryptedPassword!: String

  static findByEmail: (email: string, password: string) => Promise<UserModel | null>
  static associate: (models: any) => void
}

export default (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING(64),
        defaultValue: faker.internet.username(),
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      role: {
        type: DataTypes.ENUM('ADMIN', 'USER'),
        defaultValue: 'USER',
        allowNull: false,
      },
      encryptedPassword: {
        type: DataTypes.STRING(64),
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'user',
    },
  )

  return UserModel
}

UserModel.associate = (models: any) => {
  UserModel.hasMany(models.Track, {
    foreignKey: { name: 'userID', allowNull: false },
  })
}

// user.findByEmail(email, password)
UserModel.findByEmail = async (email: string, password: string) => {
  const encryptedPassword = encryptPassword(password)

  return await UserModel.findOne({
    where: {
      email,
      encryptedPassword,
    },
  })
}

export const encryptPassword = (password: string) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', config.password.secret, config.password.iv)
  const encrypted = Buffer.concat([cipher.update(password), cipher.final()])

  return encrypted.toString('hex')
}
