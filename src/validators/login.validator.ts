import { body } from 'express-validator'
import { checkValidation } from '../helper'

export const loginValidator = [
  body('email').exists().withMessage('error.email_required').isEmail().withMessage('error.email_invalid'),
  body('password').exists().withMessage('error.password_required'),

  checkValidation,
]

export const registerValidator = [
  body('name').exists().withMessage('error.name_required'),
  body('surname').exists().withMessage('error.surname_required'),
  body('nickname').optional(),
  body('email').exists().withMessage('error.email_required').isEmail().withMessage('error.email_invalid'),
  body('age').optional().isInt().withMessage('error.age_invalid'),
  body('role').optional().isIn(['ADMIN', 'USER']).withMessage('error.role_invalid'),
  body('password')
    .exists()
    .withMessage('error.password_required')
    .isLength({ min: 8 })
    .withMessage('error.password_too_short'),

  checkValidation,
]

export const refreshValidator = [
  body('refreshtoken').exists().withMessage('error.refresh_token_required'),

  checkValidation,
]
