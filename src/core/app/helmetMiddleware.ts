import helmet from 'helmet';
import { NextFunction, Request, Response } from 'express';

export const helmetMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
  helmet({
    contentSecurityPolicy: { directives: cspDefaults },
  })(request, response, next);
};
