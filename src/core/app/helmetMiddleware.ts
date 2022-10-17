import helmet from 'helmet';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const helmetMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const nonce = crypto.randomBytes(16).toString('hex');
  const contentSecurityPolicyDirectives = {
    'default-src': ["'http:'"],
    'base-uri': ["'http:'"],
    'block-all-mixed-content': [],
    'font-src': ["'http:'", 'data:'],
    'frame-ancestors': ["'self'"],
    'img-src': ["'http:'", 'data:'],
    'object-src': ["'none'"],
    'script-src': ["'http:'", "'unsafe-inline'", `'nonce-${nonce}'`],
    'script-src-attr': ["'none'"],
    'style-src': ["'http:'", "'unsafe-inline'"],
    'require-trusted-types-for': ["'script'"],
  };
  request.app.nonce = nonce;
  helmet({
    contentSecurityPolicy: { directives: contentSecurityPolicyDirectives },
  })(request, response, next);
};
