// import { isValidObjectId } from 'mongoose';
// import createHttpError from 'http-errors';

// export const isValidId = (req, res, next) => {
//   const { id } = req.params;
//   console.log(isValidObjectId(id));

//   if (!isValidObjectId(id)) {
//     return next(createHttpError(404, `${id} is not valid id`));
//     // throw createHttpError(404, `${id} is not valid id`);
//   }
//   next();
// };
// // src/middlewares/isValidId.js

import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
