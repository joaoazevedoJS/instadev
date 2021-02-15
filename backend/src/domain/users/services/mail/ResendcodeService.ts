import { inject, injectable } from 'tsyringe';
import { getTime, isBefore } from 'date-fns';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';

import IUsers from '@domain/users/entities/IUsers';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  code: string;
}

@injectable()
class ResendcodeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, code }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated user', 401);
    }

    if (user.verified_account) {
      throw new AppError('Account already authenticated', 401);
    }

    const timenow = getTime(new Date());
    const dateBeforeAllowed = isBefore(timenow, user.mail_limit_date_resend);

    if (user.mail_resend_count >= 3 && dateBeforeAllowed) {
      throw new AppError('limit of email sent, try again in a few days', 401);
    }

    await this.usersRepository.updateResendcode({ user, code });

    return user;
  }
}

export default ResendcodeService;
