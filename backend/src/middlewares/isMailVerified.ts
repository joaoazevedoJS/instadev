import { Request, Response, NextFunction } from 'express';

import MailError from '../errors/MailError';
import UserModel from '../model/UsersModel/UserModel';

class IsMailVerified {
  private _model = new UserModel();

  private _error = (response: Response) => new MailError(response);

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.userSession;

    const error = this._error(res);

    const user = await this._model.ReadReturnSelectWithWhereFirst(
      ['confirmAccount'],
      { id: userId },
    );

    if (!user.confirmAccount) return error.mailNotVerified();

    next();
  };
}

export default new IsMailVerified();
