import { EntityRepository, Repository } from 'typeorm';
import { addDays, getTime, isAfter } from 'date-fns';

import Users from '../models/entities/Users';

interface ResendcodeDTO {
  user: Users;
  code: string;
}

@EntityRepository(Users)
class UsersRepositories extends Repository<Users> {
  public async updateResendcode({ user, code }: ResendcodeDTO): Promise<void> {
    const timenow = getTime(new Date());

    const dateAfterAllowed = isAfter(timenow, user.mail_limit_date_resend);

    if (user.mail_resend_count >= 3 && dateAfterAllowed) {
      user.mail_resend_count = 0;
    }

    user.mail_resend_count += 1;
    user.verification_code = code;

    if (user.mail_resend_count >= 3) {
      user.mail_limit_date_resend = addDays(timenow, 1);
    }

    await this.save(user);
  }
}

export default UsersRepositories;
