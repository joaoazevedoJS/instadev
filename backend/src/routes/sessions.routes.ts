import { Router } from 'express';
import { parseISO } from 'date-fns';

import AcessAccountService from '../services/AcessAccountService';
import SendMailService from '../services/MailsService/SendMailService';
import CreateUserService from '../services/UsersService/CreateUserService';

import Email from '../models/utils/Email';
import Password from '../models/utils/Password';
import MailAccountCode from '../models/smtp/MailAccountCode';

const sessionsRoutes = Router();

sessionsRoutes.post('/signup', async (request, response) => {
  try {
    const { name, email, user_name, password, birthday } = request.body;

    const mail = new Email(email);
    const pass = new Password(password);
    const parseDate = parseISO(birthday);

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email: mail.email,
      password: pass,
      user_name,
      name,
      birthday: parseDate,
    });

    const sendMail = new SendMailService();

    const mailAccount = new MailAccountCode({
      mail,
      code: user.verification_code,
    });

    sendMail.execute(mailAccount);

    const userWithoutPassword = { ...user, password: undefined };

    return response.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

sessionsRoutes.post('/signin', async (request, response) => {
  try {
    const { email, password } = request.body;

    const acessAccount = new AcessAccountService();

    const { token, user } = await acessAccount.execute({ email, password });

    const userWithoutPassword = { ...user, password: undefined };

    return response.status(201).json({ token, user: userWithoutPassword });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRoutes;
