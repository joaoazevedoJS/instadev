import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ValidateEmailService from '@domain/users/services/auth/ValidateEmailService';
import ValidatePasswordService from '@domain/users/services/auth/ValidatePasswordService';
import CreateUserService from '@domain/users/services/CreateUserService';
import GenerateCodeService from '@shared/services/auth/GenerateCodeService';
import SendMailService from '@shared/services/smtp/SendMailService';

import IMailAccountCode from '@shared/smtp/mails/IMailAccountCode';
import GetUserInfoByUsernameService from '@domain/users/services/GetUserInfoByUsernameService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, user_name, password, birthday } = request.body;

    const validateEmail = new ValidateEmailService();
    const validatePassword = new ValidatePasswordService();

    validateEmail.execute(email);
    validatePassword.execute(password);

    const parseDate = parseISO(birthday);

    const createUser = container.resolve(CreateUserService);
    const generateCode = container.resolve(GenerateCodeService);
    const sendMail = container.resolve(SendMailService);

    const verification_code = generateCode.execute();

    const user = await createUser.execute({
      email,
      password,
      user_name,
      name,
      verification_code,
      birthday: parseDate,
    });

    const mailAccount = new IMailAccountCode({
      email,
      code: verification_code,
    });

    sendMail.execute(mailAccount);

    const userWithoutPassword = { ...user, password: undefined };

    return response.status(201).json({ user: userWithoutPassword });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_name } = request.params;

    const getUserInfoByUsername = container.resolve(
      GetUserInfoByUsernameService,
    );

    const info = await getUserInfoByUsername.execute(user_name);

    const userWithoutPassword = {
      ...info.user,
      password: undefined,
      verification_code: undefined,
    };

    return response.json({ ...info, user: userWithoutPassword });
  }
}

export default UsersController;
