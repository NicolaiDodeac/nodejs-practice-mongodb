import { Router } from 'express';
import * as studentsController from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validationHandler.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidIdHandler.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const studentsRouter = Router();

studentsRouter.use(authenticate);

studentsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(studentsController.getStudentsController),
);
studentsRouter.get(
  '/:id',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(studentsController.getStudentByIdController),
);
studentsRouter.post(
  '/register',
  validateBody(createStudentSchema),
  ctrlWrapper(studentsController.postStudentController),
);
studentsRouter.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(studentsController.postStudentController),
);

studentsRouter.patch(
  '/:id',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateStudentSchema),
  ctrlWrapper(studentsController.patchStudentController),
);
studentsRouter.put(
  '/:id',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(studentsController.upsertStudentController),
);

studentsRouter.delete(
  '/:id',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(studentsController.deleteStudentController),
);

export default studentsRouter;
