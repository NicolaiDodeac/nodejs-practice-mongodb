import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      next(createHttpError(400, error.message));

      // const errorMessages = err.details
      //   .map((detail) => detail.message)
      //   .join(', ');
      // const error = createHttpError(400, `Validation Error: ${errorMessages}`);
      // next(error);
    }
  };
  return func;
};
