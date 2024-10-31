import Joi from 'joi';
import { typeList } from '../constants/students.js';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least {3} characters',
    'string.max': 'name should have at most {30} characters',
    'any.required': 'name is required',
  }),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string()
    .valid(...typeList)
    .required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
  parentId: Joi.string().required(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid(...typeList),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});
