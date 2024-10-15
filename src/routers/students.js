import { Router } from 'express';
import * as studentsController from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validationHandler.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidIdHandler.js';

const Studentsrouter = Router();

Studentsrouter.get(
  '/students',
  ctrlWrapper(studentsController.getStudentsController),
);
Studentsrouter.get(
  '/students/:id',
  isValidId,
  ctrlWrapper(studentsController.getStudentByIdController),
);
Studentsrouter.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(studentsController.postStudentController),
);

Studentsrouter.patch(
  '/students/:id',
  validateBody(updateStudentSchema),
  ctrlWrapper(studentsController.patchStudentController),
);

Studentsrouter.delete(
  '/students/:id',
  isValidId,
  ctrlWrapper(studentsController.deleteStudentController),
);

Studentsrouter.put(
  '/students/:id',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(studentsController.upsertStudentController),
);

export default Studentsrouter;
