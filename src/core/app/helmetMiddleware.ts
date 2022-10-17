import helmet from 'helmet';
import { NextFunction, Request, Response } from 'express';

export const helmetMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
  delete cspDefaults['upgrade-insecure-requests'];
  helmet({
    contentSecurityPolicy: { directives: cspDefaults },
    crossOriginResourcePolicy: false,
  })(request, response, next);
};
