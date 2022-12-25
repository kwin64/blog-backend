import { body } from 'express-validator';

export const registrationValidation = [
  body('email', 'Bad email').isEmail(),
  body('password', 'Bad password').isLength({ min: 5 }),
  body('nickname', 'Enter you nickname').isLength({ min: 3 }),
  // body('avatarUrl', 'Bad link to avatar').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Bad email').isEmail(),
  body('password', 'Bad password').isLength({ min: 5 }),
];
