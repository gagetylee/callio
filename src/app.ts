import 'reflect-metadata';
import express, { Application } from 'express';
import 'tsconfig-paths';
import { registerApiRoutes } from './components';
import { PORT } from '@config';
import { Database } from './data-source';
import errorMiddleware from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'


(async function main() {
  // Start database
  await Database.initialize();
   
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize API Routes
  registerApiRoutes(app, '/api/v1');

  // Setup error handler
  app.use(errorMiddleware)

  // Setup swagger
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
    },
    apis: ['./src/components/**/*.routes.ts'], // files containing annotations as above
  };

  const swaggerDoc = swaggerJsdoc(options)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


  // Listen
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();