import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Decoded } from '../../interfaces/IAuthorization';

import { hash } from '../configs/tokenConfig.json';

import UserModel from '../../model/UsersModel/UserModel';

import AuthorizationError from '../../errors/AuthorizationError';
import UserError from '../../errors/UserError';

class Authorization {
  private _model = new UserModel();

  private _authError = (response: Response) => new AuthorizationError(response);

  private _userError = (response: Response) => new UserError(response);

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    const authError = this._authError(res);
    const userError = this._userError(res);

    if (!auth) return authError.noTokenProvided();

    const [schema, token] = auth.split(' ');

    if (!/^Bearer$/i.test(schema) || !token) return authError.tokenMalformed();

    jwt.verify(token, hash, async (err, decoded: Decoded) => {
      if (err) return authError.tokenInvalid();

      const userId = decoded.id;

      const user = await this._model.GetAccount(userId);

      if (!user) return userError.userNotFound();

      req.userSession = { userId };

      return next();
    });
  };

  public authenticated = (req: Request, res: Response) => {
    // if token is true
    res.send('');
  };
}

export default new Authorization();
