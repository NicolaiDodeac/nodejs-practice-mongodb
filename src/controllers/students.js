import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  postStudent,
  upsertStudentById,
  upsertStudentByKey,
} from '../services/students.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

// export const getStudentsController = async (req, res, next) => {
//   try {
//     const students = await getAllStudents();

//     res.json({
//       status: 200,
//       message: 'Successfully found students!',
//       data: students,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'successfully found student',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { id } = req.params;
  const student = await getStudentById(id);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${id}!`,
    data: student,
  });
};
export const postStudentController = async (req, res) => {
  const data = await postStudent(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully added a student!',
    data,
  });
};
export const patchStudentController = async (req, res) => {
  const { id } = req.params;
  const { data } = await upsertStudentById(id, req.body);

  if (!data) {
    throw createHttpError(404, `Student with id ${id} was not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};
export const deleteStudentController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteStudent(id);

  if (!data) {
    throw createHttpError(404, `Student with id ${id} was not found`);
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res) => {
  const { id } = req.params;
  const { data, isNew } = await upsertStudentByKey(id, req.body, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;
  const message = isNew
    ? 'Student was inserted successfully'
    : 'Student was updated successfully';

  res.json({
    status,
    message,
    data,
  });
};
