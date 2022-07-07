import 'reflect-metadata';
import express, { Application, urlencoded } from 'express';
import 'tsconfig-paths';
import { registerApiRoutes } from './components';
import { DB_HOST, DB_NAME, NODE_ENV, PORT } from '@config';
import { User } from 'components/user/user.entity'
import { Database } from './data-source';
import { logger } from './config/logger';
import errorMiddleware from './middleware/error.middleware';


(async function main() {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Start database
  await Database.initialize();

  // Initialize API Routes
  registerApiRoutes(app, '/api/v1');

  // Setup error handler
  app.use(errorMiddleware)

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();