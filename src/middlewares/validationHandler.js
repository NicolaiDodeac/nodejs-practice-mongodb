import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: false, // Optional: Disallow unknown keys
    });
    next();
  } catch (err) {
    const errorMessages = err.details
      .map((detail) => detail.message)
      .join(', ');
    const error = createHttpError(400, `Validation Error: ${errorMessages}`);
    next(error);
  }
};
