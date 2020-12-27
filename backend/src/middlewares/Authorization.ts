import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../configs/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function Authorization(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new AppError('Token not provided', 401);
  }

  const [schema, token] = auth.split(' ');

  if (!/^Bearer$/i.test(schema) || !token) {
    throw new AppError('Token malformed', 401);
  }

  try {
    const { sub } = verify(token, authConfig.hash) as TokenPayload;

    req.user = { id: sub };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}

export default Authorization;
