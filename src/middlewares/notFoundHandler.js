export const notFoundHandler = (error, req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
};