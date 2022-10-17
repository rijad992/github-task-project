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
    'default-src': ["'self'", 'http:'],
    'base-uri': ["'self'"],
    'block-all-mixed-content': [],
    'font-src': ["'self'", 'http:', 'data:'],
    'frame-ancestors': ["'self'"],
    'img-src': ["'self'", 'http:', 'data:'],
    'object-src': ["'none'"],
    'script-src': ["'self'", 'http:', "'unsafe-inline'", `'nonce-${nonce}'`],
    'script-src-attr': ["'none'"],
    'style-src': ["'self'", 'http:', "'unsafe-inline'"],
    'require-trusted-types-for': ["'script'"],
  };
  request.app.nonce = nonce;
  helmet({
    contentSecurityPolicy: { directives: contentSecurityPolicyDirectives },
    crossOriginResourcePolicy: false,

  })(request, response, next);
};
