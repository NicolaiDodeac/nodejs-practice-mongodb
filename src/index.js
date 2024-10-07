import express from 'express';
import cors from 'cors';

import contacts from './db/contacts.js';
const app = express();
const PORT = 3000;

app.use(cors());

// app.use((reg, res, next) => {
//   console.log('first middleware');
//   next();
// });
// app.use((reg, res, next) => {
//   console.log('second middleware');
//   next();
// });

app.get('/contacts', (req, res) => {
  res.json(contacts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
