import StudentsCollection from '../db/models/Students.js';

export const getAllStudents = () => StudentsCollection.find();

export const getStudentById = (id) => StudentsCollection.findById(id);

export const postStudent = (payload) => StudentsCollection.create(payload);

export const upsertStudentById = async (id, payload, options = {}) => {
  const result = await StudentsCollection.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return {
    data: result.value,
    isNew: Boolean(result.lastErrorObject.upserted),
  };
};

export const deleteStudent = (id) => StudentsCollection.findByIdAndDelete(id);

export const upsertStudentByKey = async (_id, payload, options = {}) => {
  const result = await StudentsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return {
    data: result.value,
    isNew: Boolean(result.lastErrorObject.upserted),
  };
};
