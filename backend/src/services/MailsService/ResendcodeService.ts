import { getCustomRepository } from 'typeorm';
import { getTime, isBefore } from 'date-fns';

import UsersRepositories from '../../repositories/UsersRepositories';

import Users from '../../models/entities/Users';

import RandomCode from '../../auth/RandomCode';

import AppError from '../../errors/AppError';

class ResendcodeService {
  public async execute(user_id: string): Promise<Users> {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne(user_id);

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

    const code = RandomCode();

    await usersRepositories.updateResendcode({ user, code });

    return user;
  }
}

export default ResendcodeService;
