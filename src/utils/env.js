import 'dotenv/config';

export const env = (name, defaulyValue) => {
  const value = process.env[name];

  if (value) return value;

  if (defaulyValue) return defaulyValue;

  throw new Error(`Missing: process.env[${name}]`);
};
