import express, { Router } from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { globFiles } from '../../shared/files';
import * as swaggerUi from 'swagger-ui-express';

const generateSwaggerDocs = (): object => {
  const controllerPaths = globFiles(
    path.join(__dirname, '../../modules/*/controller.{ts,js}'),
  );
  const options = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Github task project',
        version: '1.0.0',
      },
    },
    apis: controllerPaths,
  };

  return swaggerJSDoc(options);
};

export const generateSwagger = (): Router => {
  const router = express.Router();

  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(generateSwaggerDocs()));

  return router;
};
