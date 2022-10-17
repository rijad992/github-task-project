import express, { Application } from 'express';
import { generateSwagger } from './core/app/swagger';
import { acceptHeaderseMiddleware } from './core/app/acceptHeadersMiddleware';
import { errorsMiddleware } from './core/app/errorsMiddleware';
import { generateApiRoutes } from './core/app/generateApiRoutes';
import { generateApiResponse } from './core/app/generateApiResponse';
import { slowDownMiddleware } from './core/app/slowDownMiddleware';
import { helmetMiddleware } from './core/app/helmetMiddleware';
import { corsMiddleware } from './core/app/corsMiddleware';

export const initApp = async (): Promise<Application> => {
  const app = express();
  app.use(slowDownMiddleware);
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(generateSwagger());
  app.use(acceptHeaderseMiddleware);
  app.use('/api', generateApiRoutes(), generateApiResponse());
  app.use(errorsMiddleware);
  return app;
};
