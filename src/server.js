import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';

import studentsRouter from './routers/students.js';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// import { validateBody } from './middlewares/validationHandler.js';
// import { isValidId } from './middlewares/isValidIdHandler.js';

const PORT = Number(env('PORT', '5000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(studentsRouter);

  // app.use(validateBody);

  // app.use(isValidId);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
