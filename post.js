import { body } from 'express-validator';

export const postCreateValidation = [
  body('title', 'Enter title').isLength({ min: 3 }).isString(),
  body('text', 'Enter value article').isLength({ min: 3 }).isString(),
  body('tags', 'Bad format tags').optional(),
  body('iamgeUrl', 'Bad link to image').optional().isString(),
];
