import { Request, Response, NextFunction } from 'express';

import UserModel from '../model/UsersModel/UserModel';
import UserError from '../errors/UserError';

import checkPartsAndReturnName from '../utils/checkPartsAndReturnName';

class URLDashboard {
  private _model = new UserModel();

  private _error = (response: Response) => new UserError(response);

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.query;

    const error = this._error(res);

    if (!user) return error.userNotFound();

    const user_name = checkPartsAndReturnName(String(user));

    if (!user_name) return error.userNameMalformed();

    const id = await this._model.ReadReturnSelectWithWhereFirst(['id'], {
      user_name,
    });

    if (!id) return error.userNotFound();

    req.params = id;

    next();
  };
}

export default new URLDashboard();
