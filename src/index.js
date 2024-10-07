import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootStrap = () => {
  initMongoConnection();
  setupServer();
};
bootStrap();
