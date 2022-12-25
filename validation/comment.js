import { body } from 'express-validator';

export const commentCreateValidation = [
  body('comment', 'Enter comment').isLength({ min: 1 }).isString(),
];
